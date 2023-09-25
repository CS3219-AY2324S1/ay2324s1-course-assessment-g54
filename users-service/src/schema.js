import yup from "yup";

export const loginRequestBodySchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const signupRequestBodySchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const updateProfileRequestBodySchema = yup.object({
  name: yup.string().required(),
  profileImageUrl: yup.string().required()
});
