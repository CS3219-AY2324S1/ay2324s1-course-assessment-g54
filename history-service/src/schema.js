import yup from "yup";

export const createHistoryRecordRequestBodySchema = yup.object({
  user_id: yup.string().uuid().required(),
  question_id: yup.number().integer().required(),
  attempt: yup.string().required(),
});
