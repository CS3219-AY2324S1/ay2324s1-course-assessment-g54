import database from "./database.js";
import * as schema from "./schema.js";
import * as utils from "./utils.js";

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleDeleteProfile = async (request, response) => {
  if (!request.headers.authorization) return res.status(401).send();
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    id = user.id;
  } catch (error) {
    console.error(error);
    return response.status(200).json(null);
  }

  try {
    await database.delete().from("users").where({ id });
    return response.status(200).send();
  } catch (error) {
    console.error(error);
    return response.status(500).send();
  }
};

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleGetOwnProfile = async (request, response) => {
  if (!request.headers.authorization) return response.status(401).send();
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    id = user.id;
  } catch (error) {
    return response.status(200).json(null);
  }

  const user = await database.select().from("users").where({ id }).first();
  if (!user) {
    console.error("User with email cannot be found.");
    return response.status(400).send();
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
  if (!request.headers.authorization) return response.status(401).send();
  const jsonWebToken = request.headers.authorization;
  try {
    utils.verifyJsonWebToken(jsonWebToken);
  } catch (error) {
    return response.status(401).send();
  }

  const id = request.params.id;
  const user = await database.select().from("users").where({ id }).first();
  if (!user) {
    console.error(`User with id ${id} cannot be found`);
    return response.status(400).send();
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

  const { id, name, isMaintainer } = user;
  const token = utils.signJsonWebToken({ id });
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

/**
 * @param { import("express").Request } request
 * @param { import("express").Response } response
 * @returns { Promise<void> }
 */
export const handleUpdateProfile = async (request, response) => {
  if (!request.headers.authorization) return res.status(401).send();
  const jsonWebToken = request.headers.authorization;
  let id;
  try {
    const user = utils.verifyJsonWebToken(jsonWebToken);
    id = user.id;
  } catch (error) {
    return response.status(200).json(null).send();
  }

  const { body } = request;
  try {
    await schema.updateProfileRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send();
  }

  const name = body.name;
  const profileImageUrl = body.profileImageUrl;

  try {
    await database("users")
      .where("id", "=", id)
      .update({ name, profileImageUrl });
  } catch (error) {
    console.error(error.message);
    return response.status(400).send();
  }

  return response.status(200).send();
};
