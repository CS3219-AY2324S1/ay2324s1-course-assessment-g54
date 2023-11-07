const axios = require('axios');

const {
  INVALID_JWT_ERROR_MSG
} = require("./errors.js");
const { TEST_NAME, TEST_EMAIL, TEST_PWD } = require("../credentials.js");

const signUpAndLogin = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
  } catch (error) { /* Ignore the error */ }
  const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  return response.data.token;
}

let token;
beforeAll(() => signUpAndLogin().then((t) => token = t));

test('Delete user profile with unauthorized token', async () => {
  try {
    const unauthorizedToken = 'invalid-token';
    const response = await axios.delete(`${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`, {
      headers: {
        Authorization: unauthorizedToken,
      },
    });
    throw new Error(UNEXPECTED_SUCCESS_MSG);
  } catch (error) {
    expect(error.response.status).toBe(401);
    expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG)
  }
});

test('Delete user profile with a valid token', async () => {
  const response = await axios.delete(`${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  expect(response.status).toBe(200);
});