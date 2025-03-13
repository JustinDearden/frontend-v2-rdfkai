import { createContext, useState, useContext, ReactNode } from 'react';

export interface MortgageProduct {
  id: number;
  name: string;
  family: string;
  type: 'VARIABLE' | 'FIXED';
  term: string;
  insurable: boolean;
  insurance: string; // e.g., "CONVENTIONAL"
  prepaymentOption: string; // e.g., "STANDARD" or "ENHANCED"
  restrictionsOption: string; // e.g., "SOME_RESTRICTIONS" or "NO_RESTRICTIONS"
  restrictions: string;
  fixedPenaltySpread: string; // e.g., "SMALL_PENALTY" or "BANK_PENALTY"
  helocOption: string; // e.g., "HELOC_WITHOUT"
  helocDelta: number;
  lenderName: string;
  lenderType: string; // e.g., "MONOLINE" or "BIG_BANK"
  rateHold: string; // e.g., "120_DAYS", "90_DAYS", etc.
  rate: number;
  ratePrimeVariance: number;
  bestRate: number;
  created: string; // ISO date string
  updated: string; // ISO date string
}

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
