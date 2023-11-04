const axios = require('axios');
const { io } = require("socket.io-client");

const TEST_NAME = "Carl Colin";
const TEST_EMAIL = "carl@example.com";
const TEST_PWD = "carl123";

let token;

beforeEach(async () => {
  try {
    await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
  } catch (error) {
  }

  const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  
  token = response.data.token
});

afterEach(async () => {
  await axios.delete(`${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
});

test('Send matchmaking request for easy question', async () => {
  try {
    const socket = io(`${process.env.REACT_APP_MATCHMAKING_SERVICE_HOST}`, {
      query: { difficulty: "asy", token },
      path: "/api/matchmaking-service",
    });
    console.log(socket);
  } catch (err) {
    console.log(err);
  }
})
