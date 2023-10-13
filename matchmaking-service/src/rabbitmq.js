import amqp from "amqplib";
import { findMatchRequestHandler } from "./handlers.js";

const FIND_MATCH_QUEUE = "find-match";
const MATCH_RESULTS_EXCHANGE = "match-results";

async function getConnection() {
  try {
    const connection = await amqp.connect(`${process.env.RABBITMQ_HOST}`);
    console.log("[Server]", "Connected to RabbitMQ successfully!");
    return connection;
  } catch (error) {
    console.log("[Server]", "Failed to connect to RabbitMQ!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getConnection();
  }
}

/**
 * @type {import("amqplib").Channel | null}
 */
let channel = null;
(async () => {
  const connection = await getConnection();
  channel = await connection.createChannel();
  await channel.assertQueue(FIND_MATCH_QUEUE);
  await channel.assertExchange(MATCH_RESULTS_EXCHANGE);
  await subscribeFindMatch(findMatchRequestHandler);
  process.once("SIGINT", async () => {
    if (channel) await channel.close();
    if (connection) await connection.close();
  });
})();

export const publishMatchResponse = async (result) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  await channel.assertExchange(MATCH_RESULTS_EXCHANGE, "direct");
  const isMessagePublished = channel.publish(
    MATCH_RESULTS_EXCHANGE,
    "",
    Buffer.from(JSON.stringify(result))
  );
  if (!isMessagePublished)
    throw new Error(`Error when publishing matchmaking result.\n${result}`);
};

export const enqueueFindMatch = async (userId, difficulty) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  await channel.assertQueue(FIND_MATCH_QUEUE);
  const isMessageQueued = channel.sendToQueue(
    FIND_MATCH_QUEUE,
    Buffer.from(JSON.stringify({ userId, difficulty }))
  );
  if (!isMessageQueued)
    throw new Error(
      `Error when enqueing find match message for ${userId} ${difficulty}.`
    );
};

export const subscribeFindMatch = async (requestHandler) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  await channel.assertQueue(FIND_MATCH_QUEUE);
  await channel.consume(FIND_MATCH_QUEUE, async (message) => {
    if (!message) return;
    const { userId, difficulty } = JSON.parse(message.content.toString());
    await requestHandler(userId, difficulty);
    channel.ack(message);
  });
};

export const subscribeMatchResponse = async (userId, responseHandler) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  await channel.assertExchange(MATCH_RESULTS_EXCHANGE, "direct");
  const queueName = `${userId}-result-queue`;
  const { queue } = await channel.assertQueue(queueName, { exclusive: true });
  await channel.bindQueue(queue, MATCH_RESULTS_EXCHANGE, "");
  await channel.consume(queue, async (message) => {
    if (!message) return;
    const response = JSON.parse(message.content.toString());
    console.log(response);
    const shouldDeleteQueue = await responseHandler(response);
    channel.ack(message);
    if (shouldDeleteQueue) await unsubscribeMatchResponse(userId);
  });
};

export const unsubscribeMatchResponse = async (userId) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  const queueName = `${userId}-result-queue`;
  const { queue } = await channel.checkQueue(queueName);
  if (!queue) return;
  await channel.unbindQueue(queue, MATCH_RESULTS_EXCHANGE, "");
  await channel.deleteQueue(queueName);
};
