import { ErrorMessages, ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";
import { getNumPeopleInRoom, informUserOfError } from "./common.js";

export const LeaveRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveRoom(data) {
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            informUserOfError(io, socket, currentUser, roomID, ErrorMessages.NO_ROOM_ID);
            return; 
        }
        
        const response = {
            'roomID': roomID,
            'user': currentUser,
        }

        socket.leave(roomID);
        socket.broadcast.in(roomID).emit(ServerEvents.LEFT_ROOM, response);
        console.log(`user ${currentUser} left room ${roomID}`);

        // delete room if there are no people left in the room
        const numPeople = getNumPeopleInRoom(io, socket, roomID);
        console.log(`numPeople: ${numPeople} left in room ${roomID}`);
        if (numPeople === 0) {
            await deleteRoomInfo(redisClient, roomID);
            io.in(roomID).socketsLeave(roomID);
        }
    }

    socket.on(UserEvents.LEAVE_ROOM, handleLeaveRoom);
}
