import amqp from "amqplib";

const FIND_MATCH_QUEUE = "find-match";
const MATCH_RESULTS_EXCHANGE = "match-results";

/**
 * @type {import("amqplib").Channel | null}
 */
let channel = null;
(async () => {
  const connection = await amqp.connect(`${process.env.RABBITMQ_HOST}`);
  channel = await connection.createChannel();
  process.once("SIGINT", async () => {
    if (connection) await connection.close();
    if (channel) await channel.close();
  });
})();

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

export const subscribeMatchResponse = async (userId, messageHandler) => {
  if (!channel) throw new Error("RabbitMQ channel cannot be found.");
  await channel.assertExchange(MATCH_RESULTS_EXCHANGE, "direct");
  const queueName = `${userId}-result-queue`;
  const { queue } = await channel.assertQueue(queueName, { exclusive: true });
  await channel.bindQueue(queue, MATCH_RESULTS_EXCHANGE, "");
  await channel.consume(queue, async (message) => {
    if (!message) return;
    const response = JSON.parse(message.content.toString());
    const shouldDeleteQueue = await messageHandler(response);
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
