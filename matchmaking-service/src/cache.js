import NodeCache from "node-cache";
import { v4 as uuidv4 } from "uuid";

const cache = new NodeCache();

export const findMatchRequestHandler = (userId, difficulty) => {
  if (!cache.has(difficulty)) {
    cache.set(difficulty, userId);
    console.log("[Data]", cache.data);
    return null;
  }
  const matchedUserId = cache.get(difficulty);
  if (matchedUserId === userId) return null;
  cache.del(difficulty);
  console.log("[Data]", cache.data);
  return { users: [userId, matchedUserId], difficulty, roomId: uuidv4() };
};

export const cancelFindMatchRequest = (userId, difficulty) => {
  if (!cache.has(difficulty)) return;
  const matchedUserId = cache.get(difficulty);
  if (!matchedUserId) return;
  if (matchedUserId !== userId) return;
  cache.del(difficulty);
  console.log("[Data]", cache.data);
};
