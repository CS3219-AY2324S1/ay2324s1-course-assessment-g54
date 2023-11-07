const axios = require("axios");
const { signUpAndLogin, deleteUserWithToken } = require("../utils.js");

let token;
beforeEach(() => signUpAndLogin().then((t) => { token = t }));
afterEach(() => deleteUserWithToken(token));

test('Get all questions', async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`, 
    { headers: { Authorization: token }}
  );
  expect(response.status).toBe(200)
});
