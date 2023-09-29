import { ServerEvents } from "../constants/constant.js";

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