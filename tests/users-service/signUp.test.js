const axios = require('axios');

const {
  INVALID_REQUEST_BODY_ERROR_MESSAGE,
  USER_WITH_SAME_EMAIL_FOUND_MSG
} = require("./errors.js");
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");

const TEST_NAME = "John Doe";
const TEST_EMAIL = "johndoe@example.com";
const TEST_PWD = "john123";

describe('Sign-up Successfully', () => {
  test('Sign up for new user profile successfully', async () => {
    const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
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
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
        name: 'Test User With Same Email',
        email: TEST_EMAIL,
        password: 'testuser123',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(USER_WITH_SAME_EMAIL_FOUND_MSG);
    }
  });
});

describe('Sign-up with invalid request body', () => {
  test('Sign up without name in request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
        email: 'test@example.com',
        password: 'test',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up without email in request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
        name: TEST_NAME,
        password: 'test',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up without password in request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
        name: TEST_NAME,
        email: 'test@example.com',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up with empty request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {});
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});
