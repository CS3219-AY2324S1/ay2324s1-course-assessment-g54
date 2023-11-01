const axios = require('axios');

test('Test API endpoint 1', async () => {
  const response = await axios.get('http://peerpreptest.bryanlohxz.com/api/questions-service/questions/', {
    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxZGQyMDJkLTc4ZWQtNDI0OS04MzQ4LWY4MzAxMGE3MjUyMCIsImlzc3VlZEF0IjoiMjAyMy0xMS0wMVQwOTo1Nzo0NC4xMzJaIiwiaWF0IjoxNjk4ODMyNjY0fQ.sxL_JcZwlW6D_-ir4Um8forgnEUTDPoECcZQTuBV7Hc"}
  });
  expect(response.status).toBe(200);
  //expect(response.data).toEqual({ /* expected response data */ });
});
