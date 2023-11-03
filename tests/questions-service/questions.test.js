const axios = require('axios');

const TEST_NAME = "Mary Allan";
const TEST_EMAIL = "maryallan@example.com";
const TEST_PWD = "mary123";

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

  const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
    email: TEST_EMAIL,
    password: TEST_PWD,
  });
  
  token = response.data.token
});

afterEach(async () => {
  await axios.delete(`${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
});

test('Get all questions', async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`, 
    { headers: { Authorization: token }}
  );
  expect(response.status).toBe(200)
  //console.log(response.data)
});
