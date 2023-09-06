const yup = require("yup");

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
