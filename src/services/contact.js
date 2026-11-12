const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let messages = [];

function validateContact({ name, email, message } = {}) {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!email || !EMAIL_RE.test(email.trim())) {
    errors.email = 'A valid email is required';
  }
  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function saveMessage({ name, email, message }) {
  const entry = {
    id: messages.length + 1,
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
  messages.push(entry);
  return entry;
}

function getMessages() {
  return [...messages];
}

function clearMessages() {
  messages = [];
}

module.exports = { validateContact, saveMessage, getMessages, clearMessages };
