import { ErrorMessages, ServerEvents, UserEvents } from "../constants/constant.js";
import { createRoomInfo, getRoomInfo } from "../redis/redis.js";
import { createroomID, getRandomQuestion, scheduleDeleteJob } from "../utils/utils.js";
import { validateDifficulty, validateUser } from "../validators/validators.js";
import { cleanupRoomIfEmpty, getNumPeopleInRoom, informUserOfError, informUsersSomeoneLeft } from "./common.js";

export const JoinRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleJoinRoom (data) {
        const matchedUser = data.matchedUser;
        const difficulty = data.difficulty;
        const  roomID = data.roomID === undefined ? createroomID(currentUser, matchedUser) : data.roomID;

        if (!matchedUser || !validateDifficulty(difficulty)) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.JOIN_ROOM_INVALID_FIELDS);
            return disconnectSocket(socket);
        }
        if (!roomID) {
            informUserOfError(io, socket, currentUser,  ErrorMessages.JOIN_ROOM_MISSING_FIELDS);
            return disconnectSocket(socket);
        }

        if (!data.roomID) {
            try {
                const resp = await validateUser(matchedUser, socket.handshake.query.token);
                if (!resp.data) {
                    informUserOfError(io, socket, currentUser, null, ErrorMessages.INVALID_MATCHED_USER);
                    return disconnectSocket(socket);
                }
            } catch (error) {
                informUserOfError(io, socket, currentUser, null, error.message);
                return disconnectSocket(socket);
            }
        }
        
        const cachedRoomInfo = await getRoomInfo(redisClient, roomID);
        if (cachedRoomInfo != null) {
            io.to(socket.id).emit(ServerEvents.ROOM_INFO, cachedRoomInfo);
        } else {
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
                informUserOfError(io, socket, currentUser, roomID, error.message);
                return disconnectSocket(socket);
            }

            // schedule a cron job to delete the room after 3 hours
            //scheduleDeleteJob(redisClient, roomID);
        }
        socket.join(roomID);
        informUsersSomeoneJoined(socket, currentUser, roomID);

        const numPeople = getNumPeopleInRoom(io, socket, roomID);
        console.log(`numPeople: ${numPeople} in room ${roomID}`);

        socket.on('disconnect', async () => {
            informUsersSomeoneLeft(socket, currentUser, roomID);
            await cleanupRoomIfEmpty(io, socket, redisClient, roomID);
        })
    }

    socket.on(UserEvents.JOIN_ROOM, handleJoinRoom)
}

function disconnectSocket(socket) {
    return socket.disconnect();
}

export function informUsersSomeoneJoined(socket, currentUser, roomID) {
    const notif = {
        'roomID' : roomID,
        'user' : currentUser,
    }
    socket.broadcast.in(roomID).emit(ServerEvents.JOINED_ROOM, notif);
    console.log(`user ${currentUser} has joined room ${roomID}`);
}