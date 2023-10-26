import Queue from "bull";
import redis from "redis";

import { cancelFindMatchRequest, findMatchRequestHandler } from "./cache.js";

const FIND_MATCH_QUEUE = "find-match-queue";
const MATCH_RESULTS = "match-results";

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
const client = redis.createClient({
  url: `redis://${redisConfig.host}:${redisConfig.port}`,
});

const findMatchQueue = new Queue(FIND_MATCH_QUEUE, { redis: redisConfig });
findMatchQueue.process(async (job) => {
  const { userId, difficulty, type } = job.data;
  if (type === "CANCEL") return cancelFindMatchRequest(userId, difficulty);
  await client.connect();
  const response = findMatchRequestHandler(userId, difficulty);
  if (response) await client.publish(MATCH_RESULTS, JSON.stringify(response));
  await client.disconnect();
});

export const enqueueFindMatch = async (userId, difficulty) => {
  await findMatchQueue.add(
    { userId, difficulty, type: "FIND" },
    { priority: 2 },
    { removeOnComplete: true }
  );
};

export const enqueueCancelFindMatch = async (userId, difficulty) => {
  await findMatchQueue.add(
    { userId, difficulty, type: "CANCEL" },
    { priority: 1 },
    { removeOnComplete: true }
  );
};

export const subscribeMatchResponse = async (userId, responseHandler) => {
  const subscriber = client.duplicate();
  await subscriber.connect();
  await subscriber.subscribe(MATCH_RESULTS, async (message) => {
    const result = JSON.parse(message);
    if (result.users.includes(userId)) await responseHandler(result);
    await subscriber.disconnect();
  });
  return subscriber;
};

export const unsubscribeMatchResponse = async (subscriber) => {
  await subscriber.unsubscribe(MATCH_RESULTS);
  await subscriber.disconnect();
};
