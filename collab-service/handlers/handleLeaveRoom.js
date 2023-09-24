import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export const LeaveRoomHandler = (io, socket, redisClient) => {
    async function handleLeaveRoom(data) {
        const roomID = data.roomID;
        const response = {
            'roomID': roomID,
            'msg': `user ${currentUser} has left the room`
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
