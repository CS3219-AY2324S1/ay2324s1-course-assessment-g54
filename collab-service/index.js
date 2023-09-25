import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io"
import { createRedisClient, deleteUserID, getUserID, saveSocketToUserID } from "./redis/redis.js";
import { validateLogin } from "./validators/validators.js";
import { ErrorMessages, UserEvents } from "./constants/constant.js";
import { CodeEventHandler } from "./handlers/handleCode.js";
import { GetUserHandler } from "./handlers/handleGetUsers.js";
import { JoinRoomHandler } from "./handlers/handleJoinRoom.js";
import { LeaveRoomHandler } from "./handlers/handleLeaveRoom.js";
import { LeaveAllRoomsHandler } from "./handlers/handleLeaveAllRooms.js";
import { DeleteRoomHandler } from "./handlers/handleDeleteRoom.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

const redisClient = await createRedisClient();

async function authentication(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token){
        const response = await validateLogin(socket.handshake.query.token);
        if (response.data == null) {
            next(new Error(ErrorMessages.AUTHENTICATION));
        } 
        await saveSocketToUserID(redisClient, socket.id, response.data.id);
        next();
    }
    else {
        next(new Error(ErrorMessages.AUTHENTICATION));
    } 
}

async function onConnection(socket) {
    const currentUser = await getUserID(redisClient, socket.id);
    console.log(`user ${currentUser} connected to the socket`);

    CodeEventHandler(io, socket, redisClient, currentUser);
    GetUserHandler(io, socket, redisClient, currentUser);
    JoinRoomHandler(io, socket, redisClient, currentUser);
    LeaveRoomHandler(io, socket, redisClient, currentUser);
    LeaveAllRoomsHandler(io, socket, redisClient, currentUser);
    DeleteRoomHandler(io, socket, redisClient, currentUser);

    socket.on(UserEvents.DISCONNECT, async function() {
        await deleteUserID(redisClient, socket.id);
        console.log(`user ${currentUser} disconnected`);
    });
    socket.on(UserEvents.DISCONNECT, async function(reason) {
        await deleteUserID(redisClient, socket.id);
        console.log(`user ${currentUser} disconnected: ${reason}`);
    })
}

io.use(authentication)
    .on('connection', onConnection);

server.listen(3004, () => {
  console.log('listening on *:3004');
});
