import axios from "axios";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const clientEvents = {
  CALL_PEER: "call-peer",
  DISCONNECT_PEER: "disconnect-peer"
};
const serverEvents = {
  BROADCAST_PEER_ID: "broadcast-peer-id",
  SOCKET_DISCONNECTED: "disconnect",
};

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
  path: "/api/video-service",
});

app.get("/", (req, res) => res.status(200).json({ status: "OK" }));

io.on("connection", async (socket) => {
  const { id, handshake } = socket;
  const { token, roomId } = handshake.query;
  if (!token || !roomId) {
    if (!token)
      console.error(`[${id}] Token cannot be found in handshake query.`);
    if (!roomId)
      console.error(`[${id}] RoomId cannot be found in handshake query.`);
    return socket.disconnect();
  }

  let user;
  try {
    const url = `${process.env.USERS_SERVICE_HOST}/profile`;
    const response = await axios.get(url, {
      headers: { Authorization: token },
    });
    if (response.status !== 200) {
      console.error(response.data);
      return socket.disconnect();
    }
    user = response.data;
  } catch (error) {
    console.error(error);
    return socket.disconnect();
  }
  console.log(`[${socket.id}] User ${user.id} has connected to the socket.`);
  socket.join(roomId);
  console.log(`[${socket.id}] User ${user.id} has joined room ${roomId}.`);

  socket.on(serverEvents.BROADCAST_PEER_ID, (peerId) => {
    console.log(`[${socket.id}] Broadcast peer id event received.`);
    socket.broadcast.to(roomId).emit(clientEvents.CALL_PEER, peerId);
  });

  socket.on(serverEvents.SOCKET_DISCONNECTED, () => {
    socket.broadcast.to(roomId).emit(clientEvents.DISCONNECT_PEER);
    socket.leave(roomId);
    console.log(`[${socket.id}] Socket has been disconnected.`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Video service listening on port ${PORT}`);
});
