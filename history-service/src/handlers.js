import database from "./database.js";
import * as schema from "./schema.js";
import { INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE } from "./errors.js";

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleCreateHistoryRecord = async (request, response) => {
  const { body } = request;

  try {
    await schema.createHistoryRecordRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE);
  }

  await database.insert(body).into("history");
  return response.status(200).send();
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetOwnHistoryRecords = async (request, response) => {
  const user_id = request.params.id;
  const historyRecords = await database.select().from("history").where({ user_id });
  return response.status(200).send(historyRecords);
};