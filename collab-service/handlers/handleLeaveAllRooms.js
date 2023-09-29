import { ServerEvents, UserEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";
import { getNumPeopleInRoom } from "./common.js";

export const LeaveAllRoomsHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveAllRoom(data) {
        socket.rooms.forEach( async function (room) {
                const response = {
                    'roomID': room,
                    'user': currentUser,
                }

                if (socket.id != room) {
                    socket.leave(room);
                }
                socket.broadcast.in(room).emit(ServerEvents.LEFT_ROOM, response);
                console.log(`user ${currentUser} has left the room ${room}`);

                const numPeople = getNumPeopleInRoom(io, socket, room);
                console.log(`numPeople: ${numPeople} left in room ${room}`);
                if (numPeople === 0) {
                    await deleteRoomInfo(redisClient, room);
                    io.in(room).socketsLeave(room);
                }
            }
        )
    }

    socket.on(UserEvents.LEAVE_ALL_ROOMS, handleLeaveAllRoom);
}
