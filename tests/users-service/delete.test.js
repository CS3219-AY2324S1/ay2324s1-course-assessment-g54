const axios = require('axios');

const { INVALID_JWT_ERROR_MSG } = require("./errors.js");
const { signUpAndLogin } = require("../utils.js");
const profileUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`;

let token;
beforeAll(() => signUpAndLogin().then((x) => token = x.token));

test('Delete user profile with unauthorized token', async () => {
  try {
    const unauthorizedToken = 'invalid-token';
    await axios.delete(profileUrl, { headers: { Authorization: unauthorizedToken }});
    throw new Error(UNEXPECTED_SUCCESS_MSG);
  } catch (error) {
    expect(error.response.status).toBe(401);
    expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG);
  }
});

test('Delete user profile with a valid token', async () => {
  const response = await axios.delete(profileUrl, { headers: { Authorization: token }});
  expect(response.status).toBe(200);
});