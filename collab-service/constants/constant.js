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
    'JOINED_ROOM' : 'joinedRoom',
    'LEFT_ROOM' : 'leftRoom',
    'DELETED_ROOM' : 'deletedRoom',
    'ERROR': 'error'
}

export const ErrorMessages = {
    'AUTHENTICATION': 'Authentication error',
    'INVALID_MATCHED_USER': 'Invalid matched user id',
    'JOIN_ROOM_MISSING_FIELDS':  "Failed to join room due to missing (matched user and difficulty) or (room_id)",
    'JOIN_ROOM_INVALID_FIELDS': "Failed to join room due to invalid (matched user and difficulty) or (room_id)",
    'USER_SERVICE_ERROR': 'Something went wrong with the user service',
    'QUESTION_SERVICE_ERROR': 'Something went wrong with the question service',
    'NO_ROOM_ID' : 'No roomID provided',
    'NO_CODE' : 'No code provided'
}