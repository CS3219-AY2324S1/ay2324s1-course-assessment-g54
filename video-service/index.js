import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


dotenv.config();

const PORT = process.env.PORT;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
    cors: { origin: "*" },
    methods: ["GET", "POST"],
});

app.get('/', (req, res) => res.status(200).json({status: "OK"}));

io.on("connection", (socket) => {
    socket.on("smth", (roomId, userId) => {
        socket.join(roomId)
        socket.br
    })
})

httpServer.listen(PORT, () => {
    console.log(`Video service listening on port ${PORT}`);
});
