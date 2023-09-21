import NodeCache from "node-cache";
import { publishMatchResponse } from "./rabbitmq.js";

const cache = new NodeCache();

export const findMatchRequestHandler = async (userId, difficulty) => {
  if (!cache.has(difficulty)) return cache.set(difficulty, userId);
  const matchedUserId = cache.get(difficulty);
  if (!matchedUserId) return cache.set(difficulty, userId);
  cache.del(difficulty);
  await publishMatchResponse({ users: [matchedUserId, userId], difficulty });
};

export const cancelFindMatchRequest = async (userId, difficulty) => {
  if (!cache.has(difficulty)) return;
  const matchedUserId = cache.get(difficulty);
  if (!matchedUserId) return;
  if (matchedUserId !== userId) return;
  cache.del(difficulty);
};
