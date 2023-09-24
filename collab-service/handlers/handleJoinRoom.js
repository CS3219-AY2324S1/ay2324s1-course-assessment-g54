import { ErrorMessages, ServerEvents, UserEvents } from "../constants/constant.js";
import { createRoomInfo, getRoomInfo, getUserID } from "../redis/redis.js";
import { createroomID, getRandomQuestion, scheduleDeleteJob } from "../utils/utils.js";
import { validateDifficulty } from "../validators/validators.js";

export const JoinRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleJoinRoom (data) {
        const matchedUser = data.matchedUser;
        const difficulty = data.difficulty;
        const roomID = data.roomID === undefined ? createroomID(currentUser, matchedUser) : data.roomID;

        if (!roomID) {
            const response = {
                'roomID' : roomID,
                'error': ErrorMessages.JOIN_ROOM_MISSING_FIELDS
            }
            io.to(socket.id).emit(ServerEvents.ERROR, response);
            return disconnectSocket(socket)
        } 

        socket.join(roomID);
        informOtherRoomUsers(socket, currentUser, roomID);

        const response = await getRoomInfo(redisClient, roomID);
        if (response != null) {
            io.to(socket.id).emit(ServerEvents.ROOM_INFO, response);
        } else {
            if (!matchedUser || !validateDifficulty(difficulty)) {
                const response = {
                    'roomID' : roomID,
                    'error': ErrorMessages.JOIN_ROOM_INVALID_FIELDS
                }
                io.to(socket.id).emit(ServerEvents.ERROR, response);
                console.log(`user ${currentUser} has been kicked from invalid room: ${roomID}`);
                return disconnectSocket(socket);
            }

            try{
                const randomQuestionResponse = await getRandomQuestion(socket.handshake.query.token, difficulty);
                const roomInfo = {
                    "roomID": roomID,
                    "user1": currentUser,
                    "user2": matchedUser,
                    "difficulty": difficulty,
                    "question_id": randomQuestionResponse.data.question_id,
                };
                await createRoomInfo(redisClient, roomID, roomInfo);
                io.to(socket.id).emit(ServerEvents.ROOM_INFO, roomInfo);
            } catch (error) {
                const response = {
                    'roomID' : roomID,
                    'error': error.message
                }
                io.to(socket.id).emit(ServerEvents.ERROR, response);
                console.log(`user ${currentUser} has been kicked due to some error in getting random question: ${error.message}`);
                return disconnectSocket(socket);
            }

            // schedule a cron job to delete the room after 3 hours
            //scheduleDeleteJob(redisClient, roomID);
        }
        getNumPeopleInRoom(io, socket, roomID);
        
    }

    socket.on(UserEvents.JOIN_ROOM, handleJoinRoom)
}

function disconnectSocket(socket) {
    return socket.disconnect();
}

function getNumPeopleInRoom(io, socket, roomID) {
    const numPeople = io.sockets.adapter.rooms.get(roomID).size;
    console.log(`numPeople in room ${numPeople}`);
}

function informOtherRoomUsers(socket, currentUser, roomID) {
    const notif = {
        'roomID' : roomID,
        'msg': `user ${currentUser} has join room ${roomID}`
    }
    socket.broadcast.in(roomID).emit(ServerEvents.ROOM_NOTIFS, notif);
    console.log(`user ${currentUser} joined room: ${roomID}`);
}