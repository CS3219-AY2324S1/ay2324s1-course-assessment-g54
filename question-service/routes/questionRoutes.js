import { createQuestion }  from '../controllers/createQuestion.js';
import { deleteQuestion } from '../controllers/deleteQuestion.js';
import { getSingleQuestion, getQuestionsWithQuery } from '../controllers/getQuestion.js';
import { getQuestions } from '../controllers/getQuestions.js';
import { updateQuestion } from '../controllers/updateQuestion.js';
import { validateCreateQuestion, validateUpdateQuestion, validateQuestionId, validateQuestionQuery } from '../middleware/validateQuestions.js';
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from the Question Service listening from port ${process.env.PORT}`);
});

// '/getQuestions'
router.get('/questions', [validateQuestionQuery], getQuestionsWithQuery); // getQuestions);

// '/getQuestion/:id'
router.get('/questions/:id', [validateQuestionId], getSingleQuestion);

// '/createQuestion'
router.post('/questions', [validateCreateQuestion], createQuestion);

// '/updateQuestion/:id'
router.put('/questions/:id', [validateQuestionId, validateUpdateQuestion], updateQuestion);

// '/deleteQuestion/:id'
router.delete('/questions/:id', [validateQuestionId], deleteQuestion);

export default router;