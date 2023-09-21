import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT });
const authenticationUrl = `${process.env.USERS_SERVICE_HOST}/profile`;

wss.on("connection", async (ws, request) => {
  const token = request.headers.authorization;
  if (!token) {
    console.log("Token cannot be found in authorization header.");
    return ws.close(1008, "Unauthorized");
  }

  let user = null;
  try {
    const authResponse = await fetch(authenticationUrl, {
      method: "GET",
      headers: { Authorization: token },
    });
    if (authResponse.status !== 200) throw new Error(authResponse.body);
    user = await authResponse.json();
    if (!user) {
      console.log("Invalid token found in authorization header.");
      return ws.close(1008, "Unauthorized");
    }
  } catch (error) {
    console.error(error);
    return ws.close(1011, "Internal Server Error");
  }

  return ws.close(1000);
});
