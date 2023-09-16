import { createQuestion }  from '../controllers/createQuestion.js';
import { deleteQuestion } from '../controllers/deleteQuestion.js';
import { getSingleQuestion, getQuestionsWithQuery } from '../controllers/getQuestion.js';
import { createQuestionBulk, getCurrentLeetcodeId, getLeetcodeId } from '../controllers/leetcode.js';
import { updateQuestion } from '../controllers/updateQuestion.js';
import { validateCreateQuestion, validateUpdateQuestion, validateQuestionId, validateQuestionQuery } from '../middleware/validateQuestions.js';
import express from "express";
import { validateIsMaintainer, validateLogin } from '../middleware/validateRoles.js';
import axios from 'axios';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from the Question Service listening from port ${process.env.PORT}`);
});

// '/getQuestions'
router.get('/questions', [validateLogin, validateQuestionQuery], getQuestionsWithQuery);

// '/getQuestion/:id'
router.get('/questions/:id', [validateLogin, validateQuestionId], getSingleQuestion);

// '/createQuestion'
router.post('/questions', [validateIsMaintainer, validateCreateQuestion], createQuestion);

// '/updateQuestion/:id'
router.put('/questions/:id', [validateIsMaintainer, validateQuestionId, validateUpdateQuestion], updateQuestion);

// '/deleteQuestion/:id'
router.delete('/questions/:id', [validateIsMaintainer, validateQuestionId], deleteQuestion);

router.get('/get-leetcode-id', getCurrentLeetcodeId);

router.post('/upload-bulk-questions',  createQuestionBulk);

export default router;