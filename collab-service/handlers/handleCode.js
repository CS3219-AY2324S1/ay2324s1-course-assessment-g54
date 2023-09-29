import { ErrorMessages, ServerEvents, UserEvents } from "../constants/constant.js";
import { informUserOfError } from "./common.js";

export const CodeEventHandler = (io, socket, redisClient, currentUser) => {
    async function handleCode(data) {
        const code = data.code;
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.NO_ROOM_ID);
            return; 
        }
        if (!code || code === undefined) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.NO_CODE);
            return; 
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