import axios from "axios";
import { createServer } from "http";
import NodeCache from "node-cache";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
  path: "/api/collaboration-service",
});

const roomQuestionsCache = new NodeCache();
const roomUsersCache = new NodeCache();

const clientEvents = {
  BROADCAST_YOUR_CODE: "broadcast-your-code",
  SET_COLLABORATING_USER: "set-collaborating-user",
  SET_QUESTION: "set-question",
  SHOW_NOTIFICATION: "show-notification",
  UPDATE_CODE: "update-code",
};
const serverEvents = {
  BROADCAST_CODE: "broadcast-code",
  RETRIEVE_CODE: "retrieve-code",
  SOCKET_DISCONNECTED: "disconnect",
};
const difficulties = ["easy", "medium", "hard"];

io.on("connection", async (socket) => {
  const { id, handshake } = socket;
  const { difficulty, token, roomId } = handshake.query;
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
    socket.join(roomId);
    socket.broadcast
      .to(roomId)
      .emit(
        clientEvents.SHOW_NOTIFICATION,
        `${user.name} has joined the room.`
      );
    socket.broadcast
      .to(roomId)
      .emit(clientEvents.SET_COLLABORATING_USER, user.id);
    socket.emit(clientEvents.SHOW_NOTIFICATION, "You have joined the room.");
    console.log(`[${id}] User ${user.id} has connected to room ${roomId}.`);
    const roomUsers = roomUsersCache.get(roomId);
    if (!roomUsers || roomUsers.length < 1)
      roomUsersCache.set(roomId, [user.id]);
    else {
      roomUsersCache.set(roomId, [...roomUsers, user.id]);
      socket.emit(clientEvents.SET_COLLABORATING_USER, roomUsers[0]);
    }
  } catch (error) {
    console.error(error);
    return socket.disconnect();
  }

  let questionId = roomQuestionsCache.get(roomId);
  if (!questionId) {
    if (!difficulties.includes(difficulty)) {
      console.error(`[${id}] Difficulty not found or not recgonized in query.`);
      return socket.disconnect();
    }
    try {
      const url = `${process.env.QUESTION_SERVICE_HOST}/random-questions/${difficulty}`;
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.status !== 200) {
        console.error(response.data);
        return socket.disconnect();
      }
      questionId = response.data.question_id;
      roomQuestionsCache.set(roomId, questionId);
      console.log(`[${id}] Question ${questionId} set for room ${roomId}`);
    } catch (error) {
      console.error(error);
      return socket.disconnect();
    }
  }
  socket.emit(clientEvents.SET_QUESTION, questionId);
  console.log(`[${id}] Set question for ${user.id} to ${questionId}.`);

  socket.on(serverEvents.RETRIEVE_CODE, () => {
    console.log(`[${id}] Retrieving code for ${user.id}.`);
    socket.broadcast.to(roomId).emit(clientEvents.BROADCAST_YOUR_CODE);
  });

  socket.on(serverEvents.BROADCAST_CODE, (code) => {
    socket.broadcast.to(roomId).emit(clientEvents.UPDATE_CODE, code);
  });

  socket.on(serverEvents.SOCKET_DISCONNECTED, () => {
    console.log(`[${id}] User ${user.id} has left room ${roomId}.`);
    socket.broadcast
      .to(roomId)
      .emit(clientEvents.SHOW_NOTIFICATION, `${user.name} has left the room.`);
    socket.broadcast.to(roomId).emit(clientEvents.SET_COLLABORATING_USER, null);
    socket.leave(roomId);
    roomUsersCache.set(
      roomId,
      roomUsersCache.get(roomId).filter((id) => id !== user.id)
    );
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) {
      roomQuestionsCache.del(roomId);
      roomUsersCache.del(roomId);
    }
  });
});

httpServer.listen(process.env.PORT);
console.log(`Server is listening on port ${process.env.PORT}`);
