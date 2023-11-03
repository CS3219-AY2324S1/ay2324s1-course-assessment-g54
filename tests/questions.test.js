const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service";
const QUESTIOS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/questions-service"

const TEST_NAME = "John Doe";
const TEST_EMAIL = "johndoe@example.com";
const TEST_PWD = "john123";

let token;

test('Sign up for new user profile successfully', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
    name: TEST_NAME,
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  expect(response.status).toBe(200)
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

test('Login into PeerPrepTest', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  expect(response.status).toBe(200);
  expect(response.data.token).not.toBeNull();
  token = response.data.token
});

test('Get all questions', async () => {
  const response = await axios.get(
    `${QUESTIOS_SERVICE_HOST}/questions`, 
    { headers: { Authorization: token }}
  );
  expect(response.status).toBe(200)
  console.log(response.data)
});

test('Delete user profile with a valid token', async () => {
  const response = await axios.delete(`${USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  expect(response.status).toBe(200);
});
