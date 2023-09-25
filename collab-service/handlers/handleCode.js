import { ServerEvents, UserEvents } from "../constants/constant.js";

export const CodeEventHandler = (io, socket, redisClient, currentUser) => {
    async function handleCode(data) {
        const code = data.code;
        const roomID = data.roomID;

        if (!code || code === undefined || !roomID || roomID === undefined ) {
            const response = {
                'roomID' : roomID,
                'error': `No roomID or code provided`
            }
            return io.to(socket.id).emit(ServerEvents.ERROR, response);
        }

        const response = {
            'roomID': roomID,
            'code': code
        };
        
        socket.broadcast.in(roomID).emit(ServerEvents.CODE, response);
        console.log(`user ${currentUser} sent code: ${code}`);
    }

	socket.on(UserEvents.CODE, handleCode);
};