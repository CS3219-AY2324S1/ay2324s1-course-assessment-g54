const axios = require('axios');

const {
  INCORRECT_PASSWORD_MSG,
  INVALID_REQUEST_BODY_ERROR_MESSAGE,
  USER_NOT_FOUND_MSG,
  USER_WITH_SAME_EMAIL_FOUND_MSG
} = require("./errors.js");
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");
const { getUser } = require("../credentials.js");
const test_user = getUser(false);
const { deleteUserWithToken } = require("../utils.js");
const signupUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`;
const loginUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/login`;

let token;
afterAll(() => deleteUserWithToken(token));

describe('Sign-up for new user account', () => {
  test('Sign up successfully', async () => {
    const response = await axios.post(signupUrl, test_user);
    expect(response.status).toBe(200);
  });

  test('Sign up for with existing email', async () => {
    try {
      await axios.post(signupUrl, {
        name: 'Test User',
        email: test_user.email,
        password: 'testuser123',
      });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(USER_WITH_SAME_EMAIL_FOUND_MSG);
    }
  });

  test('Sign up without name in request body', async () => {
    try {
      await axios.post(signupUrl, { email: 'test@example.com', password: 'test' });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up without email in request body', async () => {
    try {
      await axios.post(signupUrl, { name: test_user.name, password: 'test' });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up without password in request body', async () => {
    try {
      await axios.post(signupUrl, { name: test_user.name, email: 'test@example.com' });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Sign up with empty request body', async () => {
    try {
      await axios.post(signupUrl, {});
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});

describe('Login', () => {
  test('Login without password in request body', async () => {
    try {
      await axios.post(loginUrl, { email: test_user.email });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Login without email in request body', async () => {
    try {
      await axios.post(loginUrl, { password: test_user.password });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Login with non-existant user email', async () => {
    try {
      await axios.post(loginUrl, { email: 'nonexistent@example.com', password: test_user.password });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(USER_NOT_FOUND_MSG);
    }
  });

  test('Login with incorrect password', async () => {
    try {
      await axios.post(loginUrl, { email: test_user.email, password: 'incorrectpassword' });
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INCORRECT_PASSWORD_MSG);
    }
  });

  test('Login into PeerPrepTest', async () => {
    const response = await axios.post(loginUrl, { email: test_user.email, password: test_user.password });
    expect(response.status).toBe(200);
    expect(response.data.token).not.toBeNull();
    token = response.data.token;
  });
});