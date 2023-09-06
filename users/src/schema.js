const yup = require("yup");

const emailIsInvalidError = "Email is invalid.";
const missingRequiredFieldError = "A required field is missing";

const loginRequestBodySchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const signupRequestBodySchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = {
  loginRequestBodySchema,
  signupRequestBodySchema,
};
