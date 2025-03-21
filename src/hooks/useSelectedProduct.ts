// Import the useContext hook from React
import { useContext } from 'react';
// Import the SelectedProductContext created in our context file
import { SelectedProductContext } from '../context/SelectedProductContext';

/**
 * Custom hook to consume the SelectedProductContext.
 *
 * This hook allows components to access the selected product state and its updater function.
 * If the hook is used outside of a SelectedProductProvider, it throws an error to enforce correct usage.
 */
export const useSelectedProduct = () => {
  // Get the context value using useContext
  const context = useContext(SelectedProductContext);

  // If the context is undefined, it means the hook is being used outside of the provider.
  // Throw an error to inform the developer.
  if (!context) {
    throw new Error(
      'useSelectedProduct must be used within a SelectedProductProvider',
    );
  }

  // Return the context, which includes the selected product and the function to update it.
  return context;
};
