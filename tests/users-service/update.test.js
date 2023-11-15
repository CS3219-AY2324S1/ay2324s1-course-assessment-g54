const axios = require('axios');
const { signUpAndLogin, deleteUserWithToken } = require("../utils.js");

const {
  INVALID_JWT_ERROR_MSG,
  INVALID_REQUEST_BODY_ERROR_MESSAGE
} = require("./errors.js");
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");
const profileUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`;
const UPDATED_NAME = "Frankie";
const IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/828px-User_icon-cp.svg.png";

let test_user;
let token;
beforeAll(async () => signUpAndLogin().then((x) => { token = x.token, test_user  = x.user }));
afterAll(() => deleteUserWithToken(token));

describe('View user profile', () => {
  test('Get profile with valid token', async () => {
    const response = await axios.get(profileUrl, { headers: { Authorization: token }});
    expect(response.status).toBe(200);
    expect(response.data).not.toBeNull();
  
    const user = response.data;
    expect(user.name).toBe(test_user.name);
    expect(user.email).toBe(test_user.email);
    expect(user.isMaintainer).toBeFalsy();
  });

  test('Get profile with invalid token', async () => {
    try {
      await axios.get(profileUrl, { headers: { Authorization: "invalid-token" }});
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG);
    }
  });
});

describe('Update user profile successfully', () => {
  test('Update profile successfully', async () => {
    const params = { name: UPDATED_NAME, profileImageUrl: IMAGE_URL };
    const header = { headers: { Authorization: token }};
    const response = await axios.put(profileUrl, params, header);
    expect(response.status).toBe(200);
  });
});

describe('Update user profile with invalid token', () => {
  test('Update profile with invalid token', async () => {
    try {
      const params = { name: UPDATED_NAME, profileImageUrl: IMAGE_URL };
      const header = { headers: { Authorization: "invalid-token" }};
      await axios.put(profileUrl, params, header);
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toBe(INVALID_JWT_ERROR_MSG);
    }
  });
});

describe('Update user profile invalid request body', () => {
  test('Update profile without name', async () => {
    try {
      const params = { profileImageUrl: IMAGE_URL };
      const header = { headers: { Authorization: token }};
      await axios.put(profileUrl, params, header);
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });

  test('Update profile with empty request body', async () => {
    try {
      await axios.put( profileUrl, {}, { headers: { Authorization: token } }
      );
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe(INVALID_REQUEST_BODY_ERROR_MESSAGE);
    }
  });
});