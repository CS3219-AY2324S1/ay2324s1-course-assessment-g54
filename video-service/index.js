import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: { origin: "*" },
    methods: ["GET", "POST"],
});

app.get('/', (req, res) => res.status(200).json({status: "OK"}));

io.on("connection", (socket) => {
    socket.on("join-server", (userRoomId) => {
        const {peerId, roomId} = userRoomId
        console.log(`User ${peerId} has joined video-server.`);
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("user-connected", peerId)
        //console.log(`User ${userId} has joined the room ${roomId}.`);
    })
});

httpServer.listen(PORT, () => {
    console.log(`Video service listening on port ${PORT}`);
});
