import { WebSocketServer } from "ws";
import { getUserFromToken } from "./authorization.js";
import {
  enqueueCancelFindMatch,
  enqueueFindMatch,
  subscribeMatchResponse,
  unsubscribeMatchResponse,
} from "./redis.js";

const wss = new WebSocketServer({ port: process.env.PORT });
const difficulties = ["easy", "medium", "hard"];

wss.on("connection", async (ws, request) => {
  const requestId = Math.floor(Math.random() * 100 + 1);
  console.log(`[${requestId}]`, "Connection received.");
  try {
    console.log(`[${requestId}]`, "Retrieving authorization token.");
    const token = request.headers["sec-websocket-protocol"];
    if (!token) {
      console.error("Token cannot be found in authorization header.");
      return ws.close(1008, "Unauthorized");
    }

    console.log(`[${requestId}]`, "Verifying authorization token.");
    let user = await getUserFromToken(token);
    if (!user) {
      console.error("Invalid token found in authorization header.");
      return ws.close(1008, "Unauthorized");
    }

    console.log(`[${requestId}]`, "Retrieving matchmaking difficulty.");
    const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
    const difficulty = urlSearchParams.get("difficulty");
    console.log(`[${requestId}]`, "Validating matchmaking difficulty.");
    if (!difficulty || !difficulties.includes(difficulty.toLowerCase())) {
      const errorMsg =
        "Difficulty is missing from search params or is incorrect.";
      console.error(errorMsg);
      return ws.close(1008, errorMsg);
    }

    let isFindMatchSuccess = false;
    const matchResponseHandler = async (response) => {
      console.log(`[${requestId}]`, "Matchmaking response received.");
      const { users, difficulty } = response;
      const matchedUser = users.filter((userId) => userId !== user.id)[0];
      console.log(`[${requestId}]`, "Sending matchmaking response to caller.");
      ws.send(matchedUser);
      console.log(`[${requestId}]`, "Closing websocket.");
      ws.close(1000, JSON.stringify({ matchedUser, difficulty }));
      isFindMatchSuccess = true;
    };

    console.log(`[${requestId}]`, "Subscribing to matchmaking responses.");
    const subscriber = await subscribeMatchResponse(
      user.id,
      matchResponseHandler
    );
    console.log(`[${requestId}]`, "Enqueing matchmaking request.");
    await enqueueFindMatch(user.id, difficulty.toLowerCase());
    console.log(`[${requestId}]`, "Waiting for matchmaking response.");

    ws.on("close", async () => {
      if (isFindMatchSuccess) return;
      console.log(`[${requestId}]`, "Cancelling matchmaking request.");
      await enqueueCancelFindMatch(user.id, difficulty.toLowerCase());
      console.log(
        `[${requestId}]`,
        "Unsubscribing from matchmaking responses."
      );
      await unsubscribeMatchResponse(subscriber);
      console.log(`[${requestId}]`, "Closing websocket.");
    });
  } catch (error) {
    console.error(error);
    return ws.close(1011, "Internal Server Error");
  }
});
