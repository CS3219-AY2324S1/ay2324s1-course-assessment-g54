import { ServerEvents } from "../constants/constant.js";
import { deleteRoomInfo } from "../redis/redis.js";

export function informUserOfError(io, socket, currentUser, roomID, errorMessage) {
    const response = {
            'roomID' : roomID,
            'error': errorMessage
        }
    io.to(socket.id).emit(ServerEvents.ERROR, response);
    console.log(`user ${currentUser} has been failed to join room due to ${response.error}`);
}

export function getNumPeopleInRoom(io, socket, roomID) {
    if (io.sockets.adapter.rooms.get(roomID) !== undefined) {
        const numPeople = io.sockets.adapter.rooms.get(roomID).size;
        return numPeople;
    } else {
        return 0;
    }
}

export function informUsersSomeoneLeft(socket, currentUser, roomID) {
    const response = {
            'roomID': roomID,
            'user': currentUser,
        }

    socket.leave(roomID);
    socket.broadcast.in(roomID).emit(ServerEvents.LEFT_ROOM, response);
    console.log(`user ${currentUser} left room ${roomID}`);
}

export async function cleanupRoomIfEmpty(io, socket, redisClient, roomID) {
    // deletes room if there are no people left in the room

    const numPeople = getNumPeopleInRoom(io, socket, roomID);
    console.log(`numPeople: ${numPeople} left in room ${roomID}`);
    if (numPeople === 0) {
        await deleteRoomInfo(redisClient, roomID);
        io.in(roomID).socketsLeave(roomID);
    }
}
