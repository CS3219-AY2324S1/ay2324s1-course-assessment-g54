import { Question } from "../model/question.js";
import { filterQuestion } from "./common.js";
import { getNextQuestionId } from "./questionCounter.js";

export async function createQuestion(req, res) {
  try {
    const existingQuestionsWithTitle = await Question.find({
      title: req.body.title,
    });
    if (existingQuestionsWithTitle.length > 0)
      return res
        .status(400)
        .send("Another question with the same title already exists.");
    const createdQuestion = await populateDatabase(req.body);
    return res.send(filterQuestion(createdQuestion));
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export async function populateDatabase(q) {
  const id = await getNextQuestionId();
  const newQ = new Question({
    question_id: id,
    ...q,
  });
  await newQ.save();
  return newQ;
}
