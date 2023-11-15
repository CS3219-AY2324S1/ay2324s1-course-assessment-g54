const { v4: uuid } = require("uuid");

const getUser = (isMaintainer) => {
  if (isMaintainer) return MAINTAINER_USER;
  const userId = uuid();
  return {
    name: userId,
    email: `${userId}@example.com`,
    password: userId
  }
}

const MAINTAINER_USER  = {
  name: "Maintainer",
  email: "maintainer@email.com",
  password: "maintainer",
}

module.exports = {
  getUser
}