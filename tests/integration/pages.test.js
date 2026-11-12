const request = require('supertest');
const { createApp } = require('../../src/app');
const { clearMessages, getMessages } = require('../../src/services/contact');

const app = createApp();

beforeEach(() => clearMessages());

describe('GET /health', () => {
  test('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('pages', () => {
  test('home page renders featured products', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Welcome to the Practice Shop');
    expect(res.text).toContain('Mechanical Keyboard');
  });

  test('products page lists everything', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Webcam 1080p');
  });

  test('products page filters by search', async () => {
    const res = await request(app).get('/products?q=hub');
    expect(res.text).toContain('USB-C Hub');
    expect(res.text).not.toContain('Wireless Mouse');
  });

  test('products page shows empty message', async () => {
    const res = await request(app).get('/products?q=zzzz');
    expect(res.text).toContain('No products found.');
  });

  test('contact page renders form', async () => {
    const res = await request(app).get('/contact');
    expect(res.status).toBe(200);
    expect(res.text).toContain('<form');
  });

  test('unknown route gives 404 page', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.text).toContain('404');
  });
});

describe('POST /contact (form)', () => {
  test('valid form shows success and stores message', async () => {
    const res = await request(app)
      .post('/contact')
      .type('form')
      .send({ name: 'Sohaib', email: 'sohaib@example.com', message: 'Testing the contact form.' });
    expect(res.status).toBe(200);
    expect(res.text).toContain('Thanks!');
    expect(getMessages()).toHaveLength(1);
  });

  test('invalid form returns 400 with errors and keeps values', async () => {
    const res = await request(app)
      .post('/contact')
      .type('form')
      .send({ name: 'Sohaib', email: 'bad', message: 'short' });
    expect(res.status).toBe(400);
    expect(res.text).toContain('A valid email is required');
    expect(res.text).toContain('value="Sohaib"');
    expect(getMessages()).toHaveLength(0);
  });
});
