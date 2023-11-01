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
    socket.on("video-call", (userId, roomId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("call-user", userId)
    })
});

httpServer.listen(PORT, () => {
    console.log(`Video service listening on port ${PORT}`);
});
