import axios from "axios";
import database from "./database.js";
import * as schema from "./schema.js";
import { INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE, INVALID_JWT_ERROR_MSG, INVALID_REQUEST_BODY_ERROR_MESSAGE } from "./errors.js";

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleCreateHistoryRecord = async (request, response) => {
  const { body } = request;

  try {
    const userServiceUrl = `${process.env.USERS_SERVICE_HOST}/profile`;
    const token = request.headers.authorization;
    const config = {headers: { Authorization: token }};
    const userServiceResponse = await axios.get(userServiceUrl, config);
    const user_id = userServiceResponse.data.id;

    await schema.createHistoryRecordRequestBodySchema.validate({...body, user_id});
    await database.insert({...body, user_id}).into("history");
    return response.status(200).send();
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE);
  }

};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetOwnHistoryRecords = async (request, response) => {
  try{
    const userServiceUrl = `${process.env.USERS_SERVICE_HOST}/profile`;
    const token = request.headers.authorization;
    const config = {headers: { Authorization: token }};
    const userServiceResponse = await axios.get(userServiceUrl, config);
    const user_id = userServiceResponse.data.id;

    const historyRecords = await database.select().from("history").where({ user_id });
    return response.status(200).send(historyRecords);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_CREATE_HISTORY_RECORD_BODY_MESSAGE);
  }
};

export const handleDeletedUser = async (request, response) => {
  let user_id;
  try {
    const userServiceUrl = `${process.env.USERS_SERVICE_HOST}/profile`;
    const token = request.headers.authorization;
    const config = {headers: { Authorization: token }};
    const userServiceResponse = await axios.get(userServiceUrl, config);
    user_id = userServiceResponse.data.id;
  } catch (error) {
    return response.status(400).send(INVALID_JWT_ERROR_MSG)
  }

  try {
    await database.delete().from("history").where({ user_id });
    return response.status(200).send();
  } catch (error) {
    return response.status(400).send(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
};

export const handleDeletedQuestion = async (request, response) => {
  try {
    const userServiceUrl = `${process.env.USERS_SERVICE_HOST}/profile`;
    const token = request.headers.authorization;
    const config = {headers: { Authorization: token }};
    await axios.get(userServiceUrl, config);
  } catch (error) {
    return response.status(400).send(INVALID_JWT_ERROR_MSG)
  }

  const {questionId : question_id} = request.params;
  
  try {
    await database.delete().from("history").where({ question_id });
    return response.status(200).send();
  } catch (error) {
    return response.status(400).send(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }
};