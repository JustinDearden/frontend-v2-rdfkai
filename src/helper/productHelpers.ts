import { CardProduct, Product } from '../types';

export interface OrganizedProducts {
  bestFixed: Product | null;
  remainingFixed: Product[];
  bestVariable: Product | null;
  remainingVariable: Product[];
}

export const organizeProducts = (products: Product[]): OrganizedProducts => {
  const fixedProducts = products.filter((p) => p.type === 'FIXED');
  const variableProducts = products.filter((p) => p.type === 'VARIABLE');

  const bestFixed =
    fixedProducts.length > 0
      ? fixedProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  const bestVariable =
    variableProducts.length > 0
      ? variableProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  const remainingFixed = bestFixed
    ? fixedProducts.filter((p) => p.id !== bestFixed.id)
    : [];

  const remainingVariable = bestVariable
    ? variableProducts.filter((p) => p.id !== bestVariable.id)
    : [];

  return {
    bestFixed,
    remainingFixed,
    bestVariable,
    remainingVariable,
  };
};

export const toCardProduct = (product: {
  id: number;
  name: string;
  type: 'FIXED' | 'VARIABLE';
  bestRate: number;
  lenderName: string;
}): CardProduct => ({
  id: product.id,
  type: product.type === 'FIXED' ? 'Fixed' : 'Variable',
  name: product.name,
  bestRate: product.bestRate,
  lenderName: product.lenderName,
});
