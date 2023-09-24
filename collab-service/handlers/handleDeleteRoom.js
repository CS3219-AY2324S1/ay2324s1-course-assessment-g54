import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export const DeleteRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleDeleteRoom(data) {
        const roomID = data.roomID;
        const response = {
            'roomID': roomID,
            'msg':  `user ${currentUser} has deleted room ${roomID}`
        }
        socket.broadcast.to(roomID).emit(ServerEvents.ROOM_NOTIFS, response);
        
        await deleteRoomInfo(redisClient, roomID);
        io.in(roomID).socketsLeave(roomID);
        console.log(`user ${currentUser} has deleted room ${roomID}`);
    }

    socket.on(UserEvents.DELETE_ROOM, handleDeleteRoom);
}
