const axios = require("axios");
const { getUser } = require("./credentials.js");

const signUpAndLogin = async () => {
  const user = getUser(false);
  try {
    await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/signup`, user);
  } catch (error) { /* Ignore the error */ }
  const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
    email: user.email,
    password: user.password,
  });
  return { token: response.data.token, user };
}

const loginAsMaintainer = async () => {
  const user = getUser(true);
  const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_HOST}/login`, {
    email: user.email,
    password: user.password,
  });
  return { token: response.data.token, user };
}

const deleteUserWithToken = async (token) => {
  const deleteUrl = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile`;
  await axios.delete(deleteUrl, { headers: { Authorization: token } });
}

module.exports = {
  deleteUserWithToken,
  signUpAndLogin,
  loginAsMaintainer
}
