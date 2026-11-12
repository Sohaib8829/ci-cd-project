const express = require('express');
const { listProducts, listCategories } = require('../services/products');
const { validateContact, saveMessage } = require('../services/contact');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home', featured: listProducts().slice(0, 3) });
});

router.get('/products', (req, res) => {
  const { q = '', category = '' } = req.query;
  res.render('products', {
    title: 'Products',
    products: listProducts({ q, category }),
    categories: listCategories(),
    q,
    category,
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', errors: {}, values: {}, sent: false });
});

router.post('/contact', (req, res) => {
  const { valid, errors } = validateContact(req.body);
  if (!valid) {
    return res.status(400).render('contact', {
      title: 'Contact',
      errors,
      values: req.body,
      sent: false,
    });
  }
  saveMessage(req.body);
  return res.render('contact', { title: 'Contact', errors: {}, values: {}, sent: true });
});

module.exports = router;
