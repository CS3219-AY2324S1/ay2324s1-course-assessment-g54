const database = require("./database");
const schema = require("./schema");
const utils = require("./utils");

const handleSignup = async (request, response) => {
  const { body } = request;

  try {
    await schema.signupRequestBodySchema.validate(body);
  } catch (error) {
    console.error(error.message);
    return response.status(400).send();
  }

  const name = body.name;
  const email = body.email.toLowerCase();
  const passwordhash = await utils.hashPassword(body.password);

  try {
    await database.insert({ name, email, passwordhash }).into("users");
    return response.status(200).send();
  } catch (error) {
    console.error(error.message);
    return response.status(400).send();
  }
};

module.exports = {
  handleSignup,
};
