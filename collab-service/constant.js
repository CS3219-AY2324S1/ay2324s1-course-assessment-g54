export const difficulties = ["easy", "medium", "hard"];
export const usersServiceBase = process.env.USERS_SERVICE_HOST;
export const questionServiceBase = process.env.QUESTION_SERVICE_HOST;
export const redisUrl = `redis://default:${process.env.REDIS_PW}@${process.env.REDIS_NAME}:${process.env.REDIS_PORT}`;

export const Milliseconds = {
    "IN_ONE_MINUTE": 60000,
    "IN_THREE_HOURS": 10800000
}