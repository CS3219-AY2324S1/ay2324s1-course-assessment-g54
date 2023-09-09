import Joi from "joi";
import { COMPLEXITIES } from "./../model/constants.js";

export const validateNewQuestion = (question) => {
  const validationSchema = Joi.object(
    {
      title: Joi.string().min(3).required(),
      categories: Joi.array().items(Joi.string()),
      complexity: Joi.string().valid(...Object.values(COMPLEXITIES)).required(),
      link: Joi.string(),
      description: Joi.string(),
    }
  );
  return validationSchema.validate(question);
};

export const validateUpdatedQuestion = (question) => {
  const validationSchema = Joi.object(
    {
      title: Joi.string().min(3),
      categories: Joi.array().items(Joi.string()),
      complexity: Joi.string().valid(...Object.values(COMPLEXITIES)),
      link: Joi.string(),
      description: Joi.string(),
    }
  );
  return validationSchema.validate(question);
};