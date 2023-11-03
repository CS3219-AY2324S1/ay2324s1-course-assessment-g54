const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"

const INCORRECT_PASSWORD_MSG = "The password entered is incorrect.";
const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const USER_NOT_FOUND_MSG = "Sorry, the user cannot be found.";

const TEST_NAME = "Adam Smith";
const TEST_EMAIL = "adamsmith@example.com";
const TEST_PWD = "adamSmith";

beforeAll(async () => {
  try {
    await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
  } catch (error) {
  }
});

describe('Login with invalid request body', () => {
  test('Login without password in request body', async () => {
    try {
      await axios.post(`${USERS_SERVICE_HOST}/login`, {
        email: TEST_EMAIL,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Login without password in request body', async () => {
    try {
      await axios.post(`${USERS_SERVICE_HOST}/login`, {
        password: TEST_PWD,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});

describe('Login with invalid credentials', () => {
  test('Login with non-existant user email', async () => {
    try {
      await axios.post(`${USERS_SERVICE_HOST}/login`, {
        email: 'nonexistent@example.com',
        password: TEST_PWD,
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(USER_NOT_FOUND_MSG);
    }
  });

  test('Login with incorrect password', async () => {
    try {
      await axios.post(`${USERS_SERVICE_HOST}/login`, {
        email: TEST_EMAIL,
        password: 'incorrectpassword',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INCORRECT_PASSWORD_MSG);
    }
  });
});

describe('Login successfully', () => {
  test('Login into PeerPrepTest', async () => {
    const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
    expect(response.status).toBe(200);
    expect(response.data.token).not.toBeNull();
  });
});