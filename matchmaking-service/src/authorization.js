const authenticationUrl = `${process.env.USERS_SERVICE_HOST}/profile`;

export const getUserFromToken = async (token) => {
  const response = await fetch(authenticationUrl, {
    method: "GET",
    headers: { Authorization: token },
  });
  if (response.status !== 200) throw new Error(response.body);
  return await response.json();
};
