const bcrypt = require("bcryptjs");

const comparePasswords = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  comparePasswords,
  hashPassword,
};
