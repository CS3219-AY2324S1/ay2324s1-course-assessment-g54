import { createQuestion }  from '../controllers/createQuestion.js';
import { deleteQuestion } from '../controllers/deleteQuestion.js';
import { getSingleQuestion, getQuestionsWithQuery } from '../controllers/getQuestion.js';
import { createQuestionBulk, getCurrentLeetcodeId, getLeetcodeId } from '../controllers/leetcode.js';
import { updateQuestion } from '../controllers/updateQuestion.js';
import { validateCreateQuestion, validateUpdateQuestion, validateQuestionId, validateQuestionQuery } from '../middleware/validateQuestions.js';
import express from "express";
import { validateLogin } from '../middleware/validateRoles.js';
import axios from 'axios';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello from the Question Service listening from port ${process.env.PORT}`);
});

// '/getQuestions'
router.get('/questions', [validateQuestionQuery], getQuestionsWithQuery);

// '/getQuestion/:id'
router.get('/questions/:id', [validateQuestionId], getSingleQuestion);

// '/createQuestion'
router.post('/questions', [validateCreateQuestion], createQuestion);

// '/updateQuestion/:id'
router.put('/questions/:id', [validateQuestionId, validateUpdateQuestion], updateQuestion);

// '/deleteQuestion/:id'
router.delete('/questions/:id', [validateQuestionId], deleteQuestion);

router.get('/get-leetcode-id', getCurrentLeetcodeId);

router.post('/upload-bulk-questions',  createQuestionBulk);

router.get("/test", async (req, res, next) => {
    console.log("'/test' call");
    try {
        const testresponse = await axios.get("http://google.com");
        console.log(testresponse);
        // runs ok

        const response = await axios.get("http://127.0.0.1:3002/test");
        // connect ECONNREFUSED 127.0.0.1:3002
        console.log(response);
        return res.send("HI");
    }
    catch (err) {
        next(err)
    }
})

export default router;