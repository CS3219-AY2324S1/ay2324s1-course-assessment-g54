const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"
const INCORRECT_PASSWORD_MSG = "The password entered is incorrect.";
const INVALID_JWT_ERROR_MSG = "JWT is either missing, invalid or has expired.";
const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const USER_NOT_FOUND_MSG = "Sorry, the user cannot be found.";
const USER_WITH_SAME_EMAIL_FOUND_MSG = "Another user with this email already exists."

const TEST_NAME = "John Doe";
const TEST_EMAIL = "johndoe@example.com";
const TEST_PWD = "john123"

let token

test('Sign up for new user profile successfully', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
    name: TEST_NAME,
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  expect(response.status).toBe(200)
});

test('Sign up for new user profile with existing email', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: 'Test User With Same Email',
      email: TEST_EMAIL,
      password: 'testuser123',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(USER_WITH_SAME_EMAIL_FOUND_MSG);
  }
});

test('Sign up for new user profile without name in request body', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      email: 'test@example.com',
      password: 'test',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
});

test('Sign up for new user profile without email in request body', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: 'Test User',
      password: 'test',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
});

test('Sign up for new user profile without password in request body', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: 'Test User',
      email: 'test@example.com',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
});

test('Login with Invalid Request Body', async () => {
  try {
    const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
      email: TEST_EMAIL,
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
});

test('Login with non-existant user email', async () => {
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
      email: TEST_EMAIL,
      password: 'incorrectpassword',
    });
  } catch (error) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe(INCORRECT_PASSWORD_MSG);
  }
});

test('Login into PeerPrepTest', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  expect(response.status).toBe(200);
  expect(response.data.token).not.toBeNull();
  token = response.data.token
});

test('Get own profile with valid token', async () => {
  const response = await axios.get(
    `${USERS_SERVICE_HOST}/profile`,
    { headers: { Authorization: token }
  });
  expect(response.status).toBe(200);
  expect(response.data).not.toBeNull()

  const user = response.data;
  expect(user.name).toBe(TEST_NAME)
  expect(user.email).toBe(TEST_EMAIL)
  expect(user.isMaintainer).toBeFalsy()
});

test('Get own profile with invalid token', async () => {
  try {
    const response = await axios.get(
      `${USERS_SERVICE_HOST}/profile`,
      { headers: { Authorization: "invalid-token" }
    });
  } catch (error) {
    expect(error.response.status).toBe(401);
    expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG)
  }
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
