import { ErrorMessages, UserEvents } from "../constants/constant.js";
import { cleanupRoomIfEmpty, informUserOfError, informUsersSomeoneLeft } from "./common.js";

export const LeaveRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveRoom(data) {
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.NO_ROOM_ID);
            return; 
        }
        
        socket.leave(roomID);
        informUsersSomeoneLeft(socket, currentUser, roomID);
        await cleanupRoomIfEmpty(io, socket, redisClient, roomID);
    }

    socket.on(UserEvents.LEAVE_ROOM, handleLeaveRoom);
}
