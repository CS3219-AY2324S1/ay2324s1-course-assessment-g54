const axios = require('axios');
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");
const { signUpAndLogin, deleteUserWithToken } = require("../utils.js")
const questionsUrl = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`

let token;
beforeEach(() => signUpAndLogin().then(({ token: t }) => token = t));
afterEach(() => deleteUserWithToken(token));

test('Get one questions', async () => {
  const response = await axios.get(`${questionsUrl}/1`, { headers: { Authorization: token }});
  expect(response.status).toBe(200);
  expect(response.data).not.toBeNull();
});

test('Add new questions without maintainer permission', async () => {
  try {
    const header = {
      headers: { Authorization: token },
    };
    const params = {
      title: "New Question",
      complexity: "easy",
      categories: [],
      description: "testing question",
    };
    await axios.post(questionsUrl, params, header);
    throw new Error(UNEXPECTED_SUCCESS_MSG);
  } catch (error) {
    expect(error.response.status).toBe(401);
    expect(error.response.data).toBe("not a maintainer!")
  }
});