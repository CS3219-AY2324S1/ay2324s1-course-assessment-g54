import { validateComplexity, validateNewQuestion, validateQuery, validateUpdatedQuestion } from "./validators.js";

export const validateCreateQuestion = (req, res, next) => {
    const { error } = validateNewQuestion(req.body); 
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

export const validateQuestionQuery = (req, res, next) => {
    const { error } = validateQuery(req.query);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

export const validateUpdateQuestion = (req, res, next) => {
    const { error } = validateUpdatedQuestion(req.body); 
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

export const validateQuestionId = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(400).send("Invalid ID number");
    }
    next();
}

export const validateQuestionComplexity = (req, res, next) => {
  const { error } = validateComplexity(req.params.complexity); 
  if (error) {
      return res.status(400).send(error.details[0].message);
  }
  next();
};