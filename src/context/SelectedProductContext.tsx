import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '../types';

export interface SelectedProductContextValue {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const SelectedProductContext = createContext<
  SelectedProductContextValue | undefined
>(undefined);

export const SelectedProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const value = useMemo(
    () => ({ selectedProduct, setSelectedProduct }),
    [selectedProduct],
  );

  return (
    <SelectedProductContext.Provider value={value}>
      {children}
    </SelectedProductContext.Provider>
  );
};
