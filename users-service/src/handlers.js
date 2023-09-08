import database from "./database.js";
import * as schema from "./schema.js";
import * as utils from "./utils.js";

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetProfile = async (request, response) => {
  if (!request.headers.authorization) return res.status(401).send();
  const jsonWebToken = request.headers.authorization;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    const { id, name, email } = user;
    return response.status(200).json({ id, name, email }).send();
  } catch (error) {
    return response.status(200).json(null).send();
  }
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
    return response.status(400).send();
  }

  const email = body.email.toLowerCase();
  const user = await database.select().from("users").where({ email }).first();
  if (!user) {
    console.error("User with email cannot be found.");
    return response.status(400).send();
  }

  const isPasswordCorrect = await utils.comparePasswords(
    body.password,
    user.passwordHash
  );
  if (!isPasswordCorrect) {
    console.error("Passwords do not match.");
    return response.status(400).send();
  }

  const jsonWebToken = utils.signJsonWebToken(user);
  return response.status(200).send(jsonWebToken);
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
    return response.status(400).send();
  }

  const name = body.name;
  const email = body.email.toLowerCase();
  const passwordHash = await utils.hashPassword(body.password);

  try {
    await database.insert({ name, email, passwordHash }).into("users");
    return response.status(200).send();
  } catch (error) {
    console.error(error.message);
    return response.status(400).send();
  }
};
