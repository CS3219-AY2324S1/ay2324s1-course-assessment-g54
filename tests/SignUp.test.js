const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"
const INCORRECT_PASSWORD_MSG = "The password entered is incorrect.";
const INVALID_JWT_ERROR_MSG = "JWT is either missing, invalid or has expired.";
const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const SERVER_ERROR_MSG = "Sorry, something went wrong with the server.";
const USER_NOT_FOUND_MSG = "Sorry, the user cannot be found.";
let token

test('Sign up for new user profile', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testuser',
  });

  expect(response.status).toBe(200)
});

test('Login with Invalid Request Body', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
      email: 'sample@email.com',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
});

test('Login with User Not Found', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
      email: 'nonexistent@example.com',
      password: 'password',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(USER_NOT_FOUND_MSG);
  }
});

test('Login with Incorrect Password', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
      email: 'testuser@example.com',
      password: 'incorrectpassword',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INCORRECT_PASSWORD_MSG);
  }
});


test('Login into PeerPrepTest', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
    email: 'testuser@example.com',
    password: 'testuser',
  });
  expect(response.status).toBe(200);
  expect(response.data.token).not.toBeNull();
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
