import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export const LeaveRoomHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveRoom(data) {
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
            'msg': `user ${currentUser} has left the room ${roomID}`
        }

        socket.broadcast.in(roomID).emit(ServerEvents.ROOM_NOTIFS, response);
        socket.leave(roomID);
        console.log(`user ${currentUser} left room ${roomID}`);

        // delete room if there are no people left in the room
        if (io.sockets.adapter.rooms.get(roomID) !== undefined) {
            const numPeople = io.sockets.adapter.rooms.get(roomID).size;
            console.log(`numPeople: ${numPeople} left in room ${roomID}`);
            if (numPeople == 0) {
                await deleteRoomInfo(redisClient, roomID);
                io.in(roomID).socketsLeave(roomID);
            }
        }
    }

    socket.on(UserEvents.LEAVE_ROOM, handleLeaveRoom);
}
