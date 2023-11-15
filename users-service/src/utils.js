import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const comparePasswords = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const signJsonWebToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

export const verifyJsonWebToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
