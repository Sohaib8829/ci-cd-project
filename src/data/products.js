// Fake product data. No database needed, so CI stays simple.
module.exports = [
  { id: 1, name: 'Mechanical Keyboard', category: 'accessories', priceCents: 8999, inStock: true },
  { id: 2, name: 'Wireless Mouse', category: 'accessories', priceCents: 2999, inStock: true },
  { id: 3, name: '27" Monitor', category: 'displays', priceCents: 21999, inStock: false },
  { id: 4, name: 'USB-C Hub', category: 'accessories', priceCents: 3999, inStock: true },
  { id: 5, name: 'Webcam 1080p', category: 'video', priceCents: 4999, inStock: true },
  { id: 6, name: 'Laptop Stand', category: 'furniture', priceCents: 3499, inStock: false },
];
