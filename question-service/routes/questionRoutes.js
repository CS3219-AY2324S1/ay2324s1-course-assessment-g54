import { createQuestion }  from '../controllers/createQuestion.js';
import { deleteQuestion } from '../controllers/deleteQuestion.js';
import { getSingleQuestion, getQuestionsWithQuery } from '../controllers/getQuestion.js';
import { getQuestions } from '../controllers/getQuestions.js';
import { updateQuestion } from '../controllers/updateQuestion.js';
import { validateCreateQuestion, validateUpdateQuestion, validateQuestionId, validateQuestionQuery } from '../middleware/validateQuestions.js';
import { validateUpdatedQuestion } from './../middleware/validators.js';
import sampleQuestions from './sampleQuestions.js';
import SampleQuestions from './sampleQuestions.js'; 
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from the Question Service listening from port ${process.env.PORT}`);
});

router.get('/getQuestions', getQuestions);

router.get('/getQuestion', [validateQuestionQuery], getQuestionsWithQuery);

router.get('/getQuestion/:id', [validateQuestionId], getSingleQuestion);

router.post('/createQuestion', [validateCreateQuestion], createQuestion);

router.put('/updateQuestion/:id', [validateQuestionId, validateUpdateQuestion], updateQuestion);

router.delete('/deleteQuestion/:id', [validateQuestionId], deleteQuestion);

export default router;