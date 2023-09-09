import { Question } from "../model/question.js";
import { filterQuestion, filterQuestions, filterQuestionsShort } from "./common.js";

export async function getQuestionsWithQuery(req, res) {
    try {
        const questions = await Question.find(req.query).sort('question_id');
        res.send(filterQuestionsShort(questions));
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export async function getSingleQuestion(req, res) {
    try{
        const question = await getQuestionById(req, res);
        if (!question) {
            return res.send({});
        }
        res.send(filterQuestion(question));
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export async function getQuestionById(req, res) {
    try{
        const query = {question_id: parseInt(req.params.id)};
        const questions = await Question.find(query);
        if (!questions) {
            return null;
        }
        return questions[0];
    } catch (error) {
        throw error;
    }
}