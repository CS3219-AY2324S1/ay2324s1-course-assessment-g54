const axios = require('axios');

const USERS_SERVICE_HOST = "http://peerpreptest.bryanlohxz.com/api/users-service"
let token

test('Sign up for new user profile', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/signup`, {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testuser',
  });

  expect(response.status).toBe(200)
});

test('Login into PeerPrepTest', async () => {
  const response = await axios.post(`${USERS_SERVICE_HOST}/login`, {
    email: 'testuser@example.com',
    password: 'testuser',
  });
  expect(response.data.token).not.toBeNull();
  expect(response.status).toBe(200);
  expect(response.data.token).not.toBeNull();
  token = response.data.token
});

test('Delete user profile with a valid token', async () => {

  // Make a request to delete the user profile with the valid token
  const response = await axios.delete(`${USERS_SERVICE_HOST}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(token)
  expect(response.status).toBe(200);
});
