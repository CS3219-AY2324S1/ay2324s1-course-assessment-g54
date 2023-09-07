import { validateNewQuestion, validateUpdatedQuestion } from './../middleware/validators.js';
import sampleQuestions from './sampleQuestions.js';
import SampleQuestions from './sampleQuestions.js'; 
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from the Question Service listening from port ${process.env.PORT}`);
    //res.send(`Getting Questions that are ${JSON.stringify(req.query)}`);
});

router.get('/getQuestions', (req, res) => {
    res.send(SampleQuestions);
});

router.get('/getQuestion/:id', (req, res) => {
    const question = findQuestion(parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with the given ID was not found.');

    res.send(question);
});

router.post('/postQuestion', (req, res) => {
  const { error } = validateNewQuestion(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const maxID = Math.max(...sampleQuestions.map(obj => obj.question_id));

  const newQuestion = {
    question_id: maxID + 1,
    question_title: req.body.title,
    question_categories: req.body.categories,
    question_complexity: req.body.complexity,
    quesiton_link: req.body.link,
    question_description: req.body.description
  };
  sampleQuestions.push(newQuestion);
  res.send(newQuestion);
});

router.put('/updateQuestion/:id', (req, res) => {
    const question = findQuestion(parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with the given ID was not found.');

    const { error } = validateUpdatedQuestion(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    question.question_title = req.body.title ? req.body.title: question.question_title;
    question.question_categories = req.body.categories ? req.body.categories: question.question_categories;
    question.question_complexity = req.body.complexity ? req.body.complexity: question.question_complexity;
    question.link = req.body.link ? req.body.link: question.link;
    question.question_description = req.body.description ? req.body.description : question.question_description;

    res.send(question);
});

router.delete('/deleteQuestion/:id', (req, res) => {
    const question = findQuestion(parseInt(req.params.id));
    if (!question) return res.status(404).send('The question with the given ID was not found.');

    const index = sampleQuestions.indexOf(question);
    sampleQuestions.splice(index, 1);

    res.send(question);
});

const findQuestion = (id) => {
    const question = SampleQuestions.find(q => q.question_id === parseInt(id));
    if (!question) {
        return null;
    } else {
        return question;
    }
}

export default router;