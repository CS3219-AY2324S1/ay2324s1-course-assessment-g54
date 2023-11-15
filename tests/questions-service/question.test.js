const axios = require('axios');
const { UNEXPECTED_SUCCESS_MSG } = require("../errors.js");
const { signUpAndLogin, loginAsMaintainer, deleteUserWithToken } = require("../utils.js")
const questionsUrl = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`

let normalToken;
let maintainerToken;
beforeAll(async () => {
  await signUpAndLogin().then((x) => normalToken = x.token);
  await loginAsMaintainer().then((x) => maintainerToken = x.token)
});
afterAll(async () => {
  deleteUserWithToken(normalToken);
});

describe('Non-maintainer actions', () => {
  test('Get one questions', async () => {
    const response = await axios.get(`${questionsUrl}/1`, { headers: { Authorization: normalToken }});
    expect(response.status).toBe(200);
    expect(response.data).not.toBeNull();
  });

  test('Add a new question without maintainer permission', async () => {
    try {
      const header = {
        headers: { Authorization: normalToken },
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

  test('Edit existing question without maintainer permission', async () => {
    try {
      const header = {
        headers: { Authorization: normalToken },
      };
      const params = {
        title: "Edited Question",
        complexity: "easy",
        categories: [],
        description: "Editing question description",
      };
      await axios.put(`${questionsUrl}/1`, params, header);
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toBe("not a maintainer!")
    }
  });

  test('Delete existing question without maintainer permission', async () => {
    try {
      const header = {
        headers: { Authorization: normalToken },
      };
      await axios.delete(`${questionsUrl}/1`, header);
      throw new Error(UNEXPECTED_SUCCESS_MSG);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toBe("not a maintainer!")
    }
  });
});

describe('Maintainer actions', () => {
  let questionId;
  let questionTitle;
  let questionComplexity;
  let questionCategories;
  let questionDescription;
  test('Get one questions', async () => {
    const response = await axios.get(`${questionsUrl}/1`, { headers: { Authorization: maintainerToken }});
    expect(response.status).toBe(200);
    expect(response.data).not.toBeNull();
  });

  test('Add a new question', async () => {
    const header = {
      headers: { Authorization: maintainerToken },
    };
    questionTitle = "Question Added";
    questionComplexity = "easy";
    questionCategories = [];
    questionDescription = "Test description"
    const params = {
      title: questionTitle,
      complexity: questionComplexity,
      categories: questionCategories,
      description: questionDescription,
    };
    const response = await axios.post(questionsUrl, params, header);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(questionTitle);
    expect(response.data.complexity).toBe(questionComplexity);
    expect(response.data.categories).toStrictEqual(questionCategories);
    expect(response.data.description).toBe(questionDescription);
    expect(response.data.question_id).not.toBeNull();
    questionId = response.data.question_id;
  });

  test('Edit existing question', async () => {
    const header = {
      headers: { Authorization: maintainerToken },
    };
    questionTitle = "Question Edited";
    questionComplexity = "hard";
    questionDescription = "Test description edited"
    const params = {
      title: questionTitle,
      complexity: questionComplexity,
      categories: questionCategories,
      description: questionDescription,
    };
    response = await axios.put(`${questionsUrl}/${questionId}`, params, header);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(questionTitle);
    expect(response.data.complexity).toBe(questionComplexity);
    expect(response.data.categories).toStrictEqual(questionCategories);
    expect(response.data.description).toBe(questionDescription);
    expect(response.data.question_id).not.toBeNull();
  });

  test('Delete existing question', async () => {
    const header = {
      headers: { Authorization: maintainerToken },
    };
    const response = await axios.delete(`${questionsUrl}/${questionId}`, header);
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(questionTitle);
    expect(response.data.complexity).toBe(questionComplexity);
    expect(response.data.categories).toStrictEqual(questionCategories);
    expect(response.data.description).toBe(questionDescription);
    expect(response.data.question_id).not.toBeNull();
  });
});