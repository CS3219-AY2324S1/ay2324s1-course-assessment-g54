const axios = require('axios');

const {
  INCORRECT_PASSWORD_MSG,
  INVALID_REQUEST_BODY_ERROR_MESSAGE,
  USER_NOT_FOUND_MSG
} = require("./errors.js");
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");
const { TEST_NAME, TEST_EMAIL, TEST_PWD } = require("../credentials.js");

let token;

beforeEach(async () => {
  try {
    await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, {
      name: TEST_NAME,
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
  } catch (error) {
  }
});

afterAll(async () => {
  await axios.delete(`${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
});

describe('Login with invalid request body', () => {
  test('Login without password in request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
        email: TEST_EMAIL,
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Login without password in request body', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
        password: TEST_PWD,
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});

describe('Login with invalid credentials', () => {
  test('Login with non-existant user email', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
        email: 'nonexistent@example.com',
        password: TEST_PWD,
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(USER_NOT_FOUND_MSG);
    }
  });

  test('Login with incorrect password', async () => {
    try {
      await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
        email: TEST_EMAIL,
        password: 'incorrectpassword',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INCORRECT_PASSWORD_MSG);
    }
  });
});

describe('Login successfully', () => {
  test('Login into PeerPrepTest', async () => {
    const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
      email: TEST_EMAIL,
      password: TEST_PWD,
    });
    expect(response.status).toBe(200);
    expect(response.data.token).not.toBeNull();
    token = response.data.token
  });
});