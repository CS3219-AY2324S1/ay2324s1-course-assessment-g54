import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export const DeleteRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleDeleteRoom(data) {
        const roomID = data.roomID;

        if (!roomID || roomID === undefined) {
            const response = {
                'roomID' : roomID,
                'error': `No roomID provided`
            }
            return io.to(socket.id).emit(ServerEvents.ERROR, response);
        }
        
        const response = {
            'roomID': roomID,
            'msg':  `user ${currentUser} has deleted room ${roomID}`
        }
        socket.broadcast.to(roomID).emit(ServerEvents.ROOM_NOTIFS, response);
        
        await deleteRoomInfo(redisClient, roomID);
        io.in(roomID).socketsLeave(roomID);
        console.log(response.msg);
    }

    socket.on(UserEvents.DELETE_ROOM, handleDeleteRoom);
}
