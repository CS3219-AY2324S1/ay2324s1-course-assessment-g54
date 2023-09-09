import { filterQuestion } from "./common.js";
import { getQuestionById } from "./getQuestion.js";

export async function updateQuestion(req, res) {
    try {
        const question = await getQuestionById(req, res);
        if (!question) {
            return res.status(404).send('The question with the given ID was not found.');
        }

        question.title = req.body.title ? req.body.title: question.title;
        question.categories = req.body.categories ? req.body.categories: question.categories;
        question.complexity = req.body.complexity ? req.body.complexity: question.complexity;
        question.link = req.body.link ? req.body.link: question.link;
        question.description = req.body.description ? req.body.description : question.description;

        const updatedQuestion = await question.save();
        return res.send(filterQuestion(updatedQuestion));
    } catch (error) {
        res.status(400).send(error);
    }
}

