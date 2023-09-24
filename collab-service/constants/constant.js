export const difficulties = ["easy", "medium", "hard"];
export const usersServiceBase = process.env.USERS_SERVICE_HOST;
export const questionServiceBase = process.env.QUESTION_SERVICE_HOST;
export const redisUrl = `redis://default:${process.env.REDIS_PW}@${process.env.REDIS_NAME}:${process.env.REDIS_PORT}`;

export const Milliseconds = {
    "IN_ONE_MINUTE": 60000,
    "IN_THREE_HOURS": 10800000
}

export const UserEvents = {
    'CODE': 'code',
    'JOIN_ROOM' : 'joinRoom',
    'GET_USERS_IN_ROOM': 'getUsers',
    'LEAVE_ROOM' : 'leaveRoom',
    'DELETE_ROOM' : 'deleteRoom',
    'LEAVE_ALL_ROOMS': 'leaveAllRooms',
    'DISCONNECT' : 'disconnect'
}

export const ServerEvents = {
    'CODE': 'code',
    'ROOM_INFO': 'roomInfo',
    'ROOM_USERS': 'roomUsers',
    'ROOM_NOTIFS': 'roomNotifs',
    'ERROR': 'error'
}

export const ErrorMessages = {
    'AUTHENTICATION': 'Authentication error',
    'JOIN_ROOM_MISSING_FIELDS':  "FAILED TO JOIN ROOM BECAUSE NO (MATCHED USER AND DIFFICULTY) OR (ROOM_ID)",
    'JOIN_ROOM_INVALID_FIELDS': "FAILED TO JOIN ROOM BC INVALID (MATCHED USER AND DIFFICULTY) OR (ROOM_ID)",
}