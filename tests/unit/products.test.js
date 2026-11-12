const {
  formatPrice,
  listProducts,
  getProductById,
  listCategories,
} = require('../../src/services/products');

describe('formatPrice', () => {
  test('formats cents as dollars', () => {
    expect(formatPrice(8999)).toBe('$89.99');
    expect(formatPrice(0)).toBe('$0.00');
  });

  test('throws on invalid input', () => {
    expect(() => formatPrice(-1)).toThrow();
    expect(() => formatPrice(10.5)).toThrow();
    expect(() => formatPrice('100')).toThrow();
  });
});

describe('listProducts', () => {
  test('returns all products with formatted price', () => {
    const result = listProducts();
    expect(result).toHaveLength(6);
    expect(result[0]).toHaveProperty('price', '$89.99');
  });

  test('filters by search text, case-insensitive', () => {
    const result = listProducts({ q: 'MOUSE' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Wireless Mouse');
  });

  test('filters by category', () => {
    const result = listProducts({ category: 'accessories' });
    expect(result.length).toBeGreaterThan(1);
    result.forEach((p) => expect(p.category).toBe('accessories'));
  });

  test('combines filters', () => {
    const result = listProducts({ q: 'usb', category: 'accessories' });
    expect(result).toHaveLength(1);
  });

  test('returns empty array when nothing matches', () => {
    expect(listProducts({ q: 'nothing-like-this' })).toEqual([]);
  });
});

describe('getProductById', () => {
  test('finds a product (id as string works too)', () => {
    expect(getProductById('2').name).toBe('Wireless Mouse');
  });

  test('returns null for unknown id', () => {
    expect(getProductById(999)).toBeNull();
  });
});

describe('listCategories', () => {
  test('returns unique sorted categories', () => {
    expect(listCategories()).toEqual(['accessories', 'displays', 'furniture', 'video']);
  });
});
