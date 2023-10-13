import database from "./database.js";
import {
  INCORRECT_PASSWORD_MSG,
  INVALID_JWT_ERROR_MSG,
  INVALID_REQUEST_BODY_ERROR_MESSAGE,
  SERVER_ERROR_MSG,
  USER_NOT_FOUND_MSG,
} from "./errors.js";
import * as schema from "./schema.js";
import * as utils from "./utils.js";

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleDeleteProfile = async (request, response) => {
  if (!request.headers.authorization)
    return res.status(401).send(INVALID_JWT_ERROR_MSG);
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    if (!user.issuedAt) return response.status(401).send(INVALID_JWT_ERROR_MSG);
    const timeDifference = new Date() - new Date(user.issuedAt);
    if (timeDifference > process.env.JWT_EXPIRY_SECONDS)
      return response.status(401).send(INVALID_JWT_ERROR_MSG);
    id = user.id;
  } catch (error) {
    console.error(error);
    return response.status(401).json(INVALID_JWT_ERROR_MSG);
  }

  try {
    await database.delete().from("users").where({ id });
    return response.status(200).send();
  } catch (error) {
    console.error(error);
    return response.status(500).send(SERVER_ERROR_MSG);
  }
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetOwnProfile = async (request, response) => {
  if (!request.headers.authorization)
    return response.status(401).send(INVALID_JWT_ERROR_MSG);
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    if (!user.issuedAt) return response.status(401).send(INVALID_JWT_ERROR_MSG);
    const timeDifference = new Date() - new Date(user.issuedAt);
    if (timeDifference > process.env.JWT_EXPIRY_SECONDS)
      return response.status(401).send(INVALID_JWT_ERROR_MSG);
    id = user.id;
  } catch (error) {
    return response.status(401).json(INVALID_JWT_ERROR_MSG);
  }

  const user = await database.select().from("users").where({ id }).first();
  if (!user) {
    console.error("User with email cannot be found.");
    return response.status(400).send(USER_NOT_FOUND_MSG);
  }

  const { name, email, isMaintainer, profileImageUrl } = user;
  return response
    .status(200)
    .json({ id, name, email, isMaintainer, profileImageUrl });
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetProfile = async (request, response) => {
  if (!request.headers.authorization)
    return response.status(401).send(INVALID_JWT_ERROR_MSG);
  const jsonWebToken = request.headers.authorization;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    if (!user.issuedAt) return response.status(401).send(INVALID_JWT_ERROR_MSG);
    const timeDifference = new Date() - new Date(user.issuedAt);
    if (timeDifference > process.env.JWT_EXPIRY_SECONDS)
      return response.status(401).send(INVALID_JWT_ERROR_MSG);
  } catch (error) {
    return response.status(401).send(INVALID_JWT_ERROR_MSG);
  }

  const id = request.params.id;
  const user = await database.select().from("users").where({ id }).first();
  if (!user) {
    console.error(`User with id ${id} cannot be found`);
    return response.status(400).send(USER_NOT_FOUND_MSG);
  }

  const { name, profileImageUrl } = user;
  return response.status(200).json({ id, name, profileImageUrl });
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleLogin = async (request, response) => {
  const { body } = request;

  try {
    await schema.loginRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }

  const email = body.email.toLowerCase();
  const user = await database.select().from("users").where({ email }).first();
  if (!user) {
    console.error("User with email cannot be found.");
    return response.status(400).send(USER_NOT_FOUND_MSG);
  }

  const isPasswordCorrect = await utils.comparePasswords(
    body.password,
    user.passwordHash
  );
  if (!isPasswordCorrect) {
    console.error("Passwords do not match.");
    return response.status(400).send(INCORRECT_PASSWORD_MSG);
  }

  const { id, name, isMaintainer } = user;
  const token = utils.signJsonWebToken({ id, issuedAt: new Date() });
  console.log(`Token for ${user.name} is ${token}`);
  return response
    .status(200)
    .send({ user: { name, email, isMaintainer }, token });
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleSignup = async (request, response) => {
  const { body } = request;

  try {
    await schema.signupRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }

  const name = body.name;
  const email = body.email.toLowerCase();
  const passwordHash = await utils.hashPassword(body.password);

  try {
    const usersWithEmail = await database
      .select()
      .where({ email })
      .from("users");
    if (usersWithEmail.length > 0)
      return response
        .status(400)
        .send("Another user with this email already exists.");
    await database.insert({ name, email, passwordHash }).into("users");
    return response.status(200).send();
  } catch (error) {
    console.error(error.message);
    return response.status(500).send(SERVER_ERROR_MSG);
  }
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleUpdateProfile = async (request, response) => {
  if (!request.headers.authorization)
    return res.status(401).send(INVALID_JWT_ERROR_MSG);
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    if (!user.issuedAt) return response.status(401).send(INVALID_JWT_ERROR_MSG);
    const timeDifference = new Date() - new Date(user.issuedAt);
    if (timeDifference > process.env.JWT_EXPIRY_SECONDS)
      return response.status(401).send(INVALID_JWT_ERROR_MSG);
    id = user.id;
  } catch (error) {
    return response.status(401).send(INVALID_JWT_ERROR_MSG);
  }

  const { body } = request;
  try {
    await schema.updateProfileRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send(INVALID_REQUEST_BODY_ERROR_MESSAGE);
  }

  const name = body.name;
  const profileImageUrl = body.profileImageUrl;

  try {
    await database("users")
      .where("id", "=", id)
      .update({ name, profileImageUrl });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send(SERVER_ERROR_MSG);
  }

  return response.status(200).send();
};
