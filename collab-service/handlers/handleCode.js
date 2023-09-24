import { ServerEvents, UserEvents } from "../constants/constant.js";
import { getUserID } from "../redis/redis.js";

export const CodeEventHandler = (io, socket, redisClient) => {
    async function handleCode(data) {
        const code = data.code;
        const roomID = data.roomID;
        const currentUser = await getUserID(redisClient, socket.id);

        const response = {
            'roomID': roomID,
            'code': code
        };
        
        socket.broadcast.in(roomID).emit(ServerEvents.CODE, response);
        console.log(`user ${currentUser} sent code: ${code}`);
    }

	socket.on(UserEvents.CODE, handleCode);
};