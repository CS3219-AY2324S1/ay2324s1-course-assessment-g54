const axios = require('axios');

const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");

const TEST_NAME = "Blake Boris";
const TEST_EMAIL = "blake@example.com";
const TEST_PWD = "blake123";

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

test('Get one questions', async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/1`, 
    { headers: { Authorization: token }}
  );
  expect(response.status).toBe(200);
  expect(response.data).not.toBeNull();
});

test('Add new questions without maintainer permission', async () => {
  try {
    const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`;
    const header = {
      headers: { Authorization: token },
    };
    const params = {
      title: "New Question",
      complexity: "easy",
      categories: [],
      description: "testing question",
    };

    await axios.post(url, params, header);
    
    throw new Error(UNEXPECTED_SUCCESS_MSG);
  } catch (error) {
    expect(error.response.status).toBe(401)
    expect(error.response.data).toBe("not a maintainer!")
  }
});