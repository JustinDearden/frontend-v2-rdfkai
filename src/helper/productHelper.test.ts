import { describe, expect, test } from 'vitest';
import type { Product } from '../types';
import { organizeProducts, toCardProduct } from './productHelpers';

const createProduct = (overrides: Partial<Product>): Product => ({
  id: overrides.id ?? 0,
  name: overrides.name ?? 'Default Product',
  family: overrides.family ?? 'STANDARD',
  type: overrides.type ?? 'FIXED',
  term: overrides.term ?? '5_YEAR',
  insurable: overrides.insurable ?? true,
  insurance: overrides.insurance ?? 'CONVENTIONAL',
  prepaymentOption: overrides.prepaymentOption ?? 'STANDARD',
  restrictionsOption: overrides.restrictionsOption ?? 'NO_RESTRICTIONS',
  restrictions: overrides.restrictions ?? '',
  fixedPenaltySpread: overrides.fixedPenaltySpread ?? 'SMALL_PENALTY',
  helocOption: overrides.helocOption ?? 'HELOC_WITHOUT',
  helocDelta: overrides.helocDelta ?? 0,
  lenderName: overrides.lenderName ?? 'Default Lender',
  lenderType: overrides.lenderType ?? 'BIG_BANK',
  rateHold: overrides.rateHold ?? '30_DAYS',
  rate: overrides.rate ?? 0,
  ratePrimeVariance: overrides.ratePrimeVariance ?? 0,
  bestRate: overrides.bestRate ?? 0,
  created: overrides.created ?? new Date().toISOString(),
  updated: overrides.updated ?? new Date().toISOString(),
});

describe('organizeProducts', () => {
  test('should return empty results when provided an empty array', () => {
    const result = organizeProducts([]);
    expect(result).toEqual({
      bestFixed: null,
      remainingFixed: [],
      bestVariable: null,
      remainingVariable: [],
    });
  });

  test('should correctly organize fixed products', () => {
    const product1 = createProduct({
      id: 1,
      name: 'Fixed Product 1',
      type: 'FIXED',
      bestRate: 3.5,
      lenderName: 'Lender A',
    });
    const product2 = createProduct({
      id: 2,
      name: 'Fixed Product 2',
      type: 'FIXED',
      bestRate: 2.5,
      lenderName: 'Lender B',
    });
    const product3 = createProduct({
      id: 3,
      name: 'Fixed Product 3',
      type: 'FIXED',
      bestRate: 4.0,
      lenderName: 'Lender C',
    });
    const products: Product[] = [product1, product2, product3];

    const result = organizeProducts(products);
    expect(result.bestFixed).toEqual(product2);
    expect(result.remainingFixed).toEqual([product1, product3]);
    expect(result.bestVariable).toBeNull();
    expect(result.remainingVariable).toEqual([]);
  });

  test('should correctly organize variable products', () => {
    const product4 = createProduct({
      id: 4,
      name: 'Variable Product 1',
      type: 'VARIABLE',
      bestRate: 5.0,
      lenderName: 'Lender D',
    });
    const product5 = createProduct({
      id: 5,
      name: 'Variable Product 2',
      type: 'VARIABLE',
      bestRate: 4.5,
      lenderName: 'Lender E',
    });
    const products: Product[] = [product4, product5];

    const result = organizeProducts(products);
    expect(result.bestVariable).toEqual(product5);
    expect(result.remainingVariable).toEqual([product4]);
    expect(result.bestFixed).toBeNull();
    expect(result.remainingFixed).toEqual([]);
  });

  test('should correctly organize mixed products', () => {
    const fixed1 = createProduct({
      id: 1,
      name: 'Fixed Product 1',
      type: 'FIXED',
      bestRate: 3.5,
      lenderName: 'Lender A',
    });
    const fixed2 = createProduct({
      id: 2,
      name: 'Fixed Product 2',
      type: 'FIXED',
      bestRate: 2.5,
      lenderName: 'Lender B',
    });
    const variable1 = createProduct({
      id: 3,
      name: 'Variable Product 1',
      type: 'VARIABLE',
      bestRate: 4.0,
      lenderName: 'Lender C',
    });
    const variable2 = createProduct({
      id: 4,
      name: 'Variable Product 2',
      type: 'VARIABLE',
      bestRate: 3.8,
      lenderName: 'Lender D',
    });
    const products: Product[] = [fixed1, fixed2, variable1, variable2];

    const result = organizeProducts(products);
    expect(result.bestFixed).toEqual(fixed2);
    expect(result.remainingFixed).toEqual([fixed1]);
    expect(result.bestVariable).toEqual(variable2);
    expect(result.remainingVariable).toEqual([variable1]);
  });
});

describe('toCardProduct', () => {
  test('should transform fixed product type correctly', () => {
    const product = createProduct({
      id: 10,
      name: 'Fixed Product',
      type: 'FIXED',
      bestRate: 3.2,
      lenderName: 'Lender X',
    });

    const result = toCardProduct(product);
    expect(result).toEqual({
      id: 10,
      name: 'Fixed Product',
      type: 'Fixed',
      bestRate: 3.2,
      lenderName: 'Lender X',
    });
  });

  test('should transform variable product type correctly', () => {
    const product = createProduct({
      id: 11,
      name: 'Variable Product',
      type: 'VARIABLE',
      bestRate: 4.7,
      lenderName: 'Lender Y',
    });

    const result = toCardProduct(product);
    expect(result).toEqual({
      id: 11,
      name: 'Variable Product',
      type: 'Variable',
      bestRate: 4.7,
      lenderName: 'Lender Y',
    });
  });
});
