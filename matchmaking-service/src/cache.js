import NodeCache from "node-cache";

const cache = new NodeCache();

export const findMatchRequestHandler = (userId, difficulty) => {
  if (!cache.has(difficulty)) {
    cache.set(difficulty, userId);
    return null;
  }
  const matchedUserId = cache.get(difficulty);
  if (matchedUserId === userId) return null;
  cache.del(difficulty);
  return { users: [userId, matchedUserId], difficulty };
};

export const cancelFindMatchRequest = (userId, difficulty) => {
  if (!cache.has(difficulty)) return;
  const matchedUserId = cache.get(difficulty);
  if (!matchedUserId) return;
  if (matchedUserId !== userId) return;
  cache.del(difficulty);
};
