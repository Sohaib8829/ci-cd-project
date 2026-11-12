const products = require('../data/products');

function formatPrice(cents) {
  if (!Number.isInteger(cents) || cents < 0) {
    throw new Error('cents must be a non-negative integer');
  }
  return `$${(cents / 100).toFixed(2)}`;
}

function listProducts({ q, category } = {}) {
  let result = products;

  if (category) {
    result = result.filter((p) => p.category === category.toLowerCase());
  }
  if (q) {
    const needle = q.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(needle));
  }
  return result.map((p) => ({ ...p, price: formatPrice(p.priceCents) }));
}

function getProductById(id) {
  const product = products.find((p) => p.id === Number(id));
  if (!product) return null;
  return { ...product, price: formatPrice(product.priceCents) };
}

function listCategories() {
  return [...new Set(products.map((p) => p.category))].sort();
}

module.exports = { formatPrice, listProducts, getProductById, listCategories };
