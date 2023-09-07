import database from "./database.js";
import * as schema from "./schema.js";
import * as utils from "./utils.js";

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
