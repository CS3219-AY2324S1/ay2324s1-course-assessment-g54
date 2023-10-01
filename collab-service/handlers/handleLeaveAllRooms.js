import { UserEvents } from "../constants/constant.js";
import { cleanupRoomIfEmpty, informUsersSomeoneLeft } from "./common.js";

export const LeaveAllRoomsHandler = (io, socket, redisClient, currentUser) => {
    async function handleLeaveAllRoom(data) {
        socket.rooms.forEach( async function (roomID) {
                if (socket.id != roomID) {
                    socket.leave(roomID);
                }

                informUsersSomeoneLeft(socket, currentUser, roomID);
                await cleanupRoomIfEmpty(io, socket, redisClient, roomID);
            }
        )
    }

    socket.on(UserEvents.LEAVE_ALL_ROOMS, handleLeaveAllRoom);
}
