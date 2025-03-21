import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '../types';

// Define the shape of the context value using a TypeScript interface.
// It includes the currently selected product and a function to update it.
export interface SelectedProductContextValue {
  selectedProduct: Product | null; // The current selected product, or null if none is selected
  setSelectedProduct: (product: Product | null) => void; // Function to update the selected product
}

// Create a new context for the selected product.
// The context can either have the defined value or be undefined.
// Creates a context object that allows you to share data (here it is a selected product)
// across the component tree without having to pass props down manually every level.
// It sets up a channel through which the data can flow to any component that subscribes
export const SelectedProductContext = createContext<
  SelectedProductContextValue | undefined
>(undefined);

// Create the provider component for the selected product context.
// This component will wrap parts of the application where the context is needed.
export const SelectedProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /*
   * Memoize (cache) the value object that contains the selectedProduct and setter function
   * This ensures the context value only changes when selectedProduct changes,
   * preventing unnecessary re-renders of consuming components
   * Without useMemo every render of selectedProductProvider would create a new object
   * This new object reference would cause components that consume the context to re-render even if the state hasnt changed
   *
   */
  const value = useMemo(
    () => ({ selectedProduct, setSelectedProduct }),
    [selectedProduct],
  );

  // Return the context provider with the memoized value.
  // The provider wraps its children so that they can consume the context.
  return (
    <SelectedProductContext.Provider value={value}>
      {children}
    </SelectedProductContext.Provider>
  );
};
