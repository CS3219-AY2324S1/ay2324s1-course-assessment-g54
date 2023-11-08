const axios = require('axios');
const { io } = require("socket.io-client");
const { signUpAndLogin, deleteUserWithToken } = require("../utils.js");

let test_user;
let token;
beforeAll(async () => signUpAndLogin().then((x) => { token = x.token, test_user  = x.user }));
afterAll(() => deleteUserWithToken(token));

test('Send matchmaking request for easy question', async () => {
  try {
    const socket = io(`${process.env.REACT_APP_MATCHMAKING_SERVICE_HOST}`, {
      query: { difficulty: "asy", token },
      path: "/api/matchmaking-service",
    });
  } catch (err) {
    console.log(err);
  }
})
