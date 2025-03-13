import { createContext, useState, useContext, ReactNode } from 'react';
import { MortgageProduct } from '../components/Card';

interface SelectedProductContextValue {
  selectedProduct: MortgageProduct | null;
  setSelectedProduct: (product: MortgageProduct | null) => void;
}

const SelectedProductContext = createContext<
  SelectedProductContextValue | undefined
>(undefined);

export const SelectedProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<MortgageProduct | null>(null);

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
};

export const useSelectedProduct = () => {
  const context = useContext(SelectedProductContext);
  if (!context) {
    throw new Error(
      'useSelectedProduct must be used within a SelectedProductProvider',
    );
  }
  return context;
};
