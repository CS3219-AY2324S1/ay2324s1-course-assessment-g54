const axios = require('axios');

test('Test something that requires authentication', async () => {
  const response = await axios.post('http://peerpreptest.bryanlohxz.com/api/users-service/signup', {
    name: 'Test 3',
    email: 'test3@example.com',
    password: 'testpassword',
  });
  expect(response.status).not.toBeNull();
});
