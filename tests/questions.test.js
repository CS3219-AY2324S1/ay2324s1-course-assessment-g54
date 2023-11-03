const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service";
const QUESTIOS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/questions-service"

const TEST_NAME = "Mary Allan";
const TEST_EMAIL = "maryallan@example.com";
const TEST_PWD = "mary123";

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
  //console.log(response.data)
});
