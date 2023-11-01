import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidV4 } from "uuid";

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


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on("connection", (socket) => {
    socket.on("smth", (roomId, userId) => {
        socket.join(roomId)
        socket.br
    })
})

server.listen(PORT, () => {
    console.log(`Video service listening on port ${PORT}`);
});
