const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"
const INCORRECT_PASSWORD_MSG = "The password entered is incorrect.";
const INVALID_JWT_ERROR_MSG = "JWT is either missing, invalid or has expired.";
const INVALID_REQUEST_BODY_ERROR_MESSAGE = "Please check your request body.";
const USER_NOT_FOUND_MSG = "Sorry, the user cannot be found.";
const USER_WITH_SAME_EMAIL_FOUND_MSG = "Another user with this email already exists."

const TEST_NAME = "Frank Bell";
const TEST_EMAIL = "frankbell@example.com";
const TEST_PWD = "frank#!";
const UPDATED_NAME = "Frankie";
const IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png";

let token;

beforeEach(async () => {
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

afterEach(async () => {
  await axios.delete(`${USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
});

describe('View user profile', () => {
  test('Get profile with valid token', async () => {
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

  test('Get profile with invalid token', async () => {
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
});

describe('Update user profile successfully', () => {
  test('Update profile successfully', async () => {
    const response = await axios.put(
      `${USERS_SERVICE_HOST}/profile`,
      {
        name: UPDATED_NAME,
        profileImageUrl: IMAGE_URL
      },
      { headers: { Authorization: token } }
    );
    expect(response.status).toBe(200);
  });
});

describe('Update user profile with invalid token', () => {
  test('Update profile with invalid token', async () => {
    try {
      const response = await axios.put(
        `${USERS_SERVICE_HOST}/profile`,
        {
          name: UPDATED_NAME,
          profileImageUrl: IMAGE_URL
        },
        { headers: { Authorization: "invalid-token" } }
      );
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG)
    }
  });
});

describe('Update user profile invalid request body', () => {
  test('Update profile without name', async () => {
    try {
      const response = await axios.put(
        `${USERS_SERVICE_HOST}/profile`,
        {
          profileImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png"
        },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE)
    }
  });

  test('Update profile with empty request body', async () => {
    try {
      const response = await axios.put(
        `${USERS_SERVICE_HOST}/profile`,
        {},
        { headers: { Authorization: token } }
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE)
    }
  });
});