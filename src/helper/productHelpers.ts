import { CardProduct, Product } from '../types';

export interface OrganizedProducts {
  bestFixed: Product | null;
  remainingFixed: Product[];
  bestVariable: Product | null;
  remainingVariable: Product[];
}

export const organizeProducts = (products: Product[]): OrganizedProducts =>
  products.reduce<OrganizedProducts>(
    (acc, product) => {
      switch (product.type) {
        case 'FIXED':
          if (!acc.bestFixed || product.bestRate < acc.bestFixed.bestRate) {
            if (acc.bestFixed) acc.remainingFixed.push(acc.bestFixed);
            acc.bestFixed = product;
          } else {
            acc.remainingFixed.push(product);
          }
          break;
        case 'VARIABLE':
          if (
            !acc.bestVariable ||
            product.bestRate < acc.bestVariable.bestRate
          ) {
            if (acc.bestVariable) acc.remainingVariable.push(acc.bestVariable);
            acc.bestVariable = product;
          } else {
            acc.remainingVariable.push(product);
          }
          break;
      }

      return acc;
    },
    {
      bestFixed: null,
      remainingFixed: [],
      bestVariable: null,
      remainingVariable: [],
    },
  );

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
