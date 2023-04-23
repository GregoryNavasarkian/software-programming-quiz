const request = require('supertest');
const app = require('../index');

describe('Test the root path', () => {
  test('It should respond to the GET method with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
