import { Question } from "../model/question.js";
import { filterQuestion } from "./common.js";
import { getNextQuestionId } from "./questionCounter.js";

export async function createQuestion(req, res) {
    const id = await getNextQuestionId();

    const question = new Question({
        question_id: id,
        title: req.body.title,
        categories: req.body.categories,
        complexity: req.body.complexity,
        link: req.body.link,
        description: req.body.description
    });

    try {
        const createdQuestion = await question.save();
        return res.send(filterQuestion(createdQuestion));
    } catch (error) {
        console.log(e);
        return res.status(400).send(error.details);
    }
}