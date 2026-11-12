const express = require('express');
const { listProducts, getProductById } = require('../services/products');
const { validateContact, saveMessage } = require('../services/contact');

const router = express.Router();

router.get('/products', (req, res) => {
  const { q, category } = req.query;
  res.json(listProducts({ q, category }));
});

router.get('/products/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.json(product);
});

router.post('/contact', (req, res) => {
  const { valid, errors } = validateContact(req.body);
  if (!valid) return res.status(400).json({ errors });
  const saved = saveMessage(req.body);
  return res.status(201).json({ id: saved.id });
});

module.exports = router;
