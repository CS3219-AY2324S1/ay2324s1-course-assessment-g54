const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"

const INCORRECT_PASSWORD_MSG = "The password entered is incorrect.";
const INVALID_JWT_ERROR_MSG = "JWT is either missing, invalid or has expired.";
const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const USER_NOT_FOUND_MSG = "Sorry, the user cannot be found.";
const USER_WITH_SAME_EMAIL_FOUND_MSG = "Another user with this email already exists."

const TEST_NAME = "Sophie Baker";
const TEST_EMAIL = "sophiebaker@example.com";
const TEST_PWD = "sophieBaker";

let token;

beforeAll(async () => {
  try {
    await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
  } catch (error) {
  }

  const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  
  token = response.data.token
});

test('Delete user profile with unauthorized token', async () => {
  try {
    const unauthorizedToken = 'invalid-token';
    const response = await axios.delete(`${USERS_SERVICE_HOST}/profile`, {
      headers: {
        Authorization: unauthorizedToken,
      },
    });
  } catch (error) {
    expect(error.response.status).toBe(401);
    expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG)
  }
});

test('Delete user profile with a valid token', async () => {
  const response = await axios.delete(`${USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  expect(response.status).toBe(200);
});