import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io"
import { createRedisClient, createRoomInfo, deleteRoomInfo, deleteUserID, getRoomInfo, getUserID, saveSocketToUserID } from "./redis.js";
import { createRoomHash, getRandomQuestion, scheduleDeleteJob } from "./utils.js";
import { validateDifficulty, validateLogin } from "./validators.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

const redisClient = await createRedisClient();

async function authentication(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token){
        const response = await validateLogin(socket.handshake.query.token);
        if (response.data == null) {
            next(new Error('Authentication error'));
        } 
        await saveSocketToUserID(redisClient, socket.id, response.data.id);
        next();
    }
    else {
        next(new Error('Authentication error'));
    } 
}

async function onConnection(socket) {
    const currentUser = await getUserID(redisClient, socket.id);
    console.log(`user ${currentUser} connected to the socket`);

    socket.on('code', (data) => {
        const code = data.code;
        const roomHash = data.roomID;
        console.log(`user ${currentUser} sent code: ${code}`);
        socket.broadcast.in(roomHash).emit('code', code);
    });

    socket.on('joinRoom', async function(data){
        const matchedUser = data.matchedUser;
        const difficulty = data.difficulty;
        const roomHash = data.roomID === undefined ? createRoomHash(currentUser, matchedUser) : data.roomID;

        if (!roomHash) {
            io.to(socket.id).emit('roomInfo', "FAILED TO JOIN ROOM BECAUSE NO (MATCHED USER AND DIFFICULTY) OR (ROOMID)");
            return socket.disconnect("FAIL");
        }

        socket.join(roomHash);
        console.log(`user ${currentUser} joined room: ${roomHash}`);
        socket.broadcast.in(roomHash).emit(`roomNotifs`, `user ${currentUser} has join room ${roomHash}`);

        const response = await getRoomInfo(redisClient, roomHash);

        if (response != null) {
            io.to(socket.id).emit('roomInfo', response);
        } else {
            if (matchedUser && validateDifficulty(difficulty)) {
                const randomQuestion  = await getRandomQuestion();
                const roomInfo = {
                    "roomHash": roomHash,
                    "user1": currentUser,
                    "user2": matchedUser,
                    "difficulty": difficulty,
                    "question_id": randomQuestion.question_id,
                };
                await createRoomInfo(redisClient, roomHash, roomInfo);
                io.to(socket.id).emit('roomInfo', roomInfo);

                // schedule a cron job to delete the room after 3 hours
                //scheduleDeleteJob(roomHash);
            } else {
                io.to(socket.id).emit('roomInfo', "FAILED TO JOIN ROOM");
                return socket.disconnect("FAIL");
            }
        }

        const numPeople = io.sockets.adapter.rooms.get(roomHash).size;
        console.log(`numPeople in room ${numPeople}`);
    })

    socket.on('leaveRoom', async function(data) {
        const roomHash = data.roomID;
        console.log(`user ${currentUser} left room ${roomHash}`);
        socket.broadcast.in(roomHash).emit(`roomNotifs`, `user ${currentUser} has left the room`);
        socket.leave(roomHash);

        const numPeople = io.sockets.adapter.rooms.get(roomHash).size;
        console.log(`numPeople in room ${numPeople}`);
        // delete room if there are no people left in the room
        if (numPeople == 0) {
            await deleteRoomInfo(redisClient, roomHash);
            io.in(roomHash).socketsLeave(roomHash);
        }
    });

    socket.on('deleteRoom', async function(data) {
        const roomHash = data.roomID;
        console.log(`user ${currentUser} has deleted room ${roomHash}`);
        socket.broadcast.to(roomHash).emit(`roomNotifs`, `user ${currentUser} has deleted room ${roomHash}`);
        await deleteRoomInfo(redisClient, roomHash);
        io.in(roomHash).socketsLeave(roomHash);
    })

    socket.on('disconnect', async function() {
        console.log(`user ${currentUser} disconnected`);
        await deleteUserID(redisClient, socket.id);
    });

    socket.on('disconnect', async function(reason) {
        console.log(`user ${currentUser} disconnected: ${reason}`);
        await deleteUserID(redisClient, socket.id);
    })
}

io.use(authentication)
    .on('connection', onConnection);

server.listen(3004, () => {
  console.log('listening on *:3004');
});
