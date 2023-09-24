import { ServerEvents, UserEvents } from "../constants/constant.js";

export const CodeEventHandler = (io, socket, redisClient, currentUser) => {
    async function handleCode(data) {
        const code = data.code;
        const roomID = data.roomID;

        const response = {
            'roomID': roomID,
            'code': code
        };
        
        socket.broadcast.in(roomID).emit(ServerEvents.CODE, response);
        console.log(`user ${currentUser} sent code: ${code}`);
    }

	socket.on(UserEvents.CODE, handleCode);
};