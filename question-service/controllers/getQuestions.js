import { Question } from "../model/question.js";
import { filterQuestionsShort } from "./common.js";

export async function getQuestions(req, res) {
    const questions = await Question.find().sort('question_id');
    res.send(filterQuestionsShort(questions));
}