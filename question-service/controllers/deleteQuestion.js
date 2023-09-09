import { Question } from "../model/question.js";
import { filterQuestion } from "./common.js";
import { getQuestionById } from "./getQuestion.js";

export async function deleteQuestion(req, res) {
    try {
        const question = await getQuestionById(req, res);
        if (!question) {
            return res.status(404).send('The question with the given ID was not found.');
        }

        await Question.deleteOne({ question_id: question.question_id });
        return res.send(filterQuestion(question));
    } catch (error) {
        res.status(400).send(error);
    }
}