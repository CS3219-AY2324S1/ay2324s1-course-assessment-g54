const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"

const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const USER_WITH_SAME_EMAIL_FOUND_MSG = "Another user with this email already exists."

const TEST_NAME = "John Doe";
const TEST_EMAIL = "johndoe@example.com";
const TEST_PWD = "john123";

describe('Sign-up Successfully', () => {
  test('Sign up for new user profile successfully', async () => {
    const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
    expect(response.status).toBe(200)
  });
});

describe('Sign-up with existing email', () => {
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
});

describe('Sign-up with invalid request body', () => {
  test('Sign up without name in request body', async () => {
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

  test('Sign up without email in request body', async () => {
    try {
      const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
        name: TEST_NAME,
        password: 'test',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up without password in request body', async () => {
    try {
      const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
        name: TEST_NAME,
        email: 'test@example.com',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up with empty request body', async () => {
    try {
      const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {});
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});
