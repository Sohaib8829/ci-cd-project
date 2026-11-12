const request = require('supertest');
const { createApp } = require('../../src/app');
const { clearMessages } = require('../../src/services/contact');

const app = createApp();

beforeEach(() => clearMessages());

describe('GET /api/products', () => {
  test('returns the list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(6);
  });

  test('supports category filter', async () => {
    const res = await request(app).get('/api/products?category=video');
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Webcam 1080p');
  });
});

describe('GET /api/products/:id', () => {
  test('returns one product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Mechanical Keyboard');
  });

  test('404 for unknown product', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });
});

describe('POST /api/contact', () => {
  test('201 on valid payload', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Sohaib', email: 'sohaib@example.com', message: 'Hello from the API test.' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1 });
  });

  test('400 on invalid payload', async () => {
    const res = await request(app).post('/api/contact').send({ name: 'S' });
    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveProperty('name');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('message');
  });

  test('400 on malformed JSON', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{bad json');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid JSON');
  });
});
