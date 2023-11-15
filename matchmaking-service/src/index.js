import { createServer } from "http";
import { Server } from "socket.io";

import { getUserFromToken } from "./authorization.js";
import {
  enqueueCancelFindMatch,
  enqueueFindMatch,
  subscribeMatchResponse,
  unsubscribeMatchResponse,
} from "./redis.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
  path: "/api/matchmaking-service",
});

const difficulties = ["easy", "medium", "hard"];

io.on("connection", async (socket) => {
  const { id, handshake } = socket;
  const { difficulty, token } = handshake.query;
  if (!difficulty || !difficulties.includes(difficulty) || !token) {
    if (!difficulty) console.error(`[${id}] Difficulty cannot be found.`);
    if (!difficulties.includes(difficulty))
      console.error(`[${id}] Difficulty found is not recgonized.`);
    if (!token) console.error(`[${id}] Token cannot be found.`);
    return socket.disconnect();
  }

  console.log(`[${id}]`, "Connection received.");
  try {
    console.log(`[${id}]`, "Verifying authorization token.");
    let user = await getUserFromToken(token);
    if (!user) {
      console.error(`[${id}] Invalid token found in authorization header.`);
      return socket.disconnect();
    }

    let isFindMatchSuccess = false;
    const matchResponseHandler = async (response) => {
      console.log(`[${id}]`, "Matchmaking response received.");
      const { users, difficulty, roomId } = response;
      const matchedUser = users.filter((userId) => userId !== user.id)[0];
      console.log(`[${id}]`, "Sending matchmaking response to caller.");
      socket.emit("user-matched", { matchedUser, difficulty, roomId });
      console.log(`[${id}]`, "Closing websocket.");
      isFindMatchSuccess = true;
      socket.disconnect();
    };

    console.log(`[${id}]`, "Subscribing to matchmaking responses.");
    const subscriber = await subscribeMatchResponse(
      user.id,
      matchResponseHandler
    );
    console.log(`[${id}]`, "Enqueing matchmaking request.");
    await enqueueFindMatch(user.id, difficulty.toLowerCase());
    console.log(`[${id}]`, "Waiting for matchmaking response.");

    socket.on("disconnect", async () => {
      if (isFindMatchSuccess) return;
      console.log(`[${id}]`, "Cancelling matchmaking request.");
      await enqueueCancelFindMatch(user.id, difficulty.toLowerCase());
      console.log(`[${id}]`, "Unsubscribing from matchmaking responses.");
      await unsubscribeMatchResponse(subscriber);
      console.log(`[${id}]`, "Closing websocket.");
    });
  } catch (error) {
    console.error(`[${id}]`, error);
    return socket.disconnect();
  }
});

httpServer.listen(process.env.PORT);
console.log(`Server is listening on port ${process.env.PORT}`);
