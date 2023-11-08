const axios = require("axios");
const { signUpAndLogin, deleteUserWithToken } = require("../utils.js");

let token;
beforeAll(() => signUpAndLogin().then((x) => { token = x.token }));
afterAll(() => deleteUserWithToken(token));

test('Get all questions', async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`, 
    { headers: { Authorization: token }}
  );
  expect(response.status).toBe(200)
});
