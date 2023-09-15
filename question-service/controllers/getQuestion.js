import { Question } from "../model/question.js";
import { filterQuestion, filterQuestions, filterQuestionsShort } from "./common.js";

function queryBuilder(query) {
    const finalQuery = {};
    if (query.title) {
        finalQuery.title = { $regex: query.title, $options: 'i' };
    }
    if (query.complexity) {
        finalQuery.complexity = query.complexity;
    }
    if (query.description) {
        finalQuery.description = { $regex: query.description, $options: 'i' };
    }

    if (query.categories) {
        finalQuery.categories = { "$all" : query.categories.map(t => new RegExp(t))}; 
    }
    return finalQuery;
}

export async function getQuestionsWithQuery(req, res) {
    try {
        const finalQuery = queryBuilder(req.query);
        const questions = await Question.find(finalQuery).sort('question_id');
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