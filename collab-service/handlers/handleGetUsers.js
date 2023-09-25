import { ServerEvents, UserEvents } from "../constants/constant.js";
import { getUserID } from "../redis/redis.js";

export const GetUserHandler = (io, socket, redisClient, currentUser) => {
    async function handleGetUser(data) {
        const users = []
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            const response = {
                'roomID' : roomID,
                'error': `No roomID provided`
            }
            return io.to(socket.id).emit(ServerEvents.ERROR, response);
        }

        const socketInRoom = io.sockets.adapter.rooms.get(roomID)

        if (socketInRoom === undefined) {
            const response = {
                'roomID': roomID,
                'numUsers': 0, 
                'userIDs': users
            };
            return io.to(socket.id).emit(ServerEvents.ROOM_USERS, response);
        } else {
            for (const socketID of socketInRoom) {
                const user = await getUserID(redisClient, socketID)
                users.push(user);
            }
            const response = {
                'roomID': roomID,
                'numUsers': socketInRoom.size, 
                'userIDs': users
            };
            io.to(socket.id).emit(ServerEvents.ROOM_USERS, response);
        }    
    }

    socket.on(UserEvents.GET_USERS_IN_ROOM, handleGetUser);
}