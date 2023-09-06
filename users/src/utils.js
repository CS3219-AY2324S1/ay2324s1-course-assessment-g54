const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const comparePasswords = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const signJsonWebToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const verifyJsonWebToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  comparePasswords,
  hashPassword,
  signJsonWebToken,
  verifyJsonWebToken,
};
