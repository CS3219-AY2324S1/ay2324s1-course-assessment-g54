import database from "./database.js";
/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleCreateHistoryRecord = async (request, response) => {
  console.log("hi")
  const { body } = request;

  // try {
  //   await schema.createHistoryRecordRequestBodySchema.validate(body);
  // } catch (error) {
  //   console.error(error.message);
  //   return response.status(400).send(INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE);
  // }

  // const {user_id, name, question_id, title} = body;
  await database.insert(body).into("history");
  return response.status(200).send();
};


/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetOwnHistoryRecords = async (request, response) => {
  console.log("wtf")
  const user_id = request.params.id;
  // try {
  //   await schema.createHistoryRecordRequestBodySchema.validate(body);
  // } catch (error) {
  //   console.error(error.message);
  //   return response.status(400).send(INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE);
  // }

  const historyRecords = await database.select().from("history").where({ user_id }).first();
  return response.status(200).send(historyRecords);
};