import { ErrorMessages, ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";
import { informUserOfError } from "./common.js";

export const DeleteRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleDeleteRoom(data) {
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.NO_ROOM_ID);
            return; 
        }
        
        const response = {
            'roomID': roomID,
            'user': currentUser,
        }
        socket.broadcast.to(roomID).emit(ServerEvents.DELETED_ROOM, response);
        
        await deleteRoomInfo(redisClient, roomID);
        io.in(roomID).socketsLeave(roomID);
        console.log(`user ${currentUser} has deleted room ${roomID}`);
    }

    socket.on(UserEvents.DELETE_ROOM, handleDeleteRoom);
}
