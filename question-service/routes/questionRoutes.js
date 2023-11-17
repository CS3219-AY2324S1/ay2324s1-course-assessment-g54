import { createQuestion } from "../controllers/createQuestion.js";
import { deleteQuestion } from "../controllers/deleteQuestion.js";
import {
  getSingleQuestion,
  getQuestionsWithQuery,
  getRandomQuestionByComplexity,
} from "../controllers/getQuestion.js";
import {
  createQuestionBulk,
  getCurrentLeetcodeId,
  setCurrentLeetcodeId,
} from "../controllers/leetcode.js";
import { updateQuestion } from "../controllers/updateQuestion.js";
import {
  validateCreateQuestion,
  validateUpdateQuestion,
  validateQuestionId,
  validateQuestionQuery,
  validateQuestionComplexity,
} from "../middleware/validateQuestions.js";
import express from "express";
import { getCategories } from "../controllers/getCategories.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `Hello from the Question Service listening from port ${process.env.PORT}`
  );
});

// '/getQuestions'
router.get("/questions", [validateQuestionQuery], getQuestionsWithQuery);

// '/getCategories'
router.get("/categories", [], getCategories);

// '/getQuestion/:id'
router.get("/questions/:id", [validateQuestionId], getSingleQuestion);

// '/getQuestion/:complexity'
router.get(
  "/random-questions/:complexity",
  [validateQuestionComplexity],
  getRandomQuestionByComplexity
);

// '/createQuestion'
router.post("/questions", [validateCreateQuestion], createQuestion);

// '/updateQuestion/:id'
router.put(
  "/questions/:id",
  [validateQuestionId, validateUpdateQuestion],
  updateQuestion
);

// '/deleteQuestion/:id'
router.delete("/questions/:id", [validateQuestionId], deleteQuestion);

router.get("/leetcode-id", getCurrentLeetcodeId);

router.post("/leetcode-id", setCurrentLeetcodeId);

router.post("/upload-bulk-questions", createQuestionBulk);

export default router;
