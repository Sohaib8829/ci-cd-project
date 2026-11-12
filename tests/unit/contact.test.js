const {
  validateContact,
  saveMessage,
  getMessages,
  clearMessages,
} = require('../../src/services/contact');

beforeEach(() => clearMessages());

describe('validateContact', () => {
  const good = { name: 'Sohaib', email: 'sohaib@example.com', message: 'Hello, this is a test.' };

  test('accepts valid input', () => {
    expect(validateContact(good)).toEqual({ valid: true, errors: {} });
  });

  test('rejects short name', () => {
    const { valid, errors } = validateContact({ ...good, name: 'A' });
    expect(valid).toBe(false);
    expect(errors.name).toBeDefined();
  });

  test('rejects bad email', () => {
    const { errors } = validateContact({ ...good, email: 'not-an-email' });
    expect(errors.email).toBeDefined();
  });

  test('rejects short message', () => {
    const { errors } = validateContact({ ...good, message: 'short' });
    expect(errors.message).toBeDefined();
  });

  test('handles missing body', () => {
    const { valid, errors } = validateContact();
    expect(valid).toBe(false);
    expect(Object.keys(errors)).toHaveLength(3);
  });
});

describe('message store', () => {
  test('saves and trims messages', () => {
    const saved = saveMessage({ name: '  Ali ', email: ' ali@example.com ', message: ' hello there friend ' });
    expect(saved).toMatchObject({ id: 1, name: 'Ali', email: 'ali@example.com' });
    expect(getMessages()).toHaveLength(1);
  });
});
