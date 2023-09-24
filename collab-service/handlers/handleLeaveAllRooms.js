import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export const LeaveAllRoomsHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveAllRoom(data) {
        socket.rooms.forEach( async function (room) {
                if (socket.id != room) {
                    socket.leave(room);
                }
                
                const response = {
                    'roomID': room,
                    'msg': `user ${currentUser} has left the room ${room}`
                }
                socket.broadcast.in(room).emit(ServerEvents.ROOM_NOTIFS, response);
                console.log(response.msg);
                
                if (io.sockets.adapter.rooms.get(room) !== undefined) {
                    const numPeople = io.sockets.adapter.rooms.get(room).size;
                    if (numPeople == 0) {
                        await deleteRoomInfo(redisClient, room);
                        io.in(room).socketsLeave(room);
                    }
                }
            }
        )
    }

    socket.on(UserEvents.LEAVE_ALL_ROOMS, handleLeaveAllRoom);
}
