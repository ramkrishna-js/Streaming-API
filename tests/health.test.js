const request = require('supertest');
const app = require('../server');

describe('GET /health', () => {
  it('should return 200 and success message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Streaming API is running');
  });
});

describe('GET /api', () => {
  it('should return API documentation', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('endpoints');
  });
});