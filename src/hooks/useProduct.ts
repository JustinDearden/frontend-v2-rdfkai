/**
 * Custom hook to fetch products using TanStack React Query.
 *
 *
 * **Key Points for Discussion:**
 *
 * - **Separation of Concerns:**
 *   The data fetching logic (`fetchProducts`) is separated from the component logic, making it reusable and easy to test.
 *
 * - **Automatic Caching & Updates:**
 *   React Query manages caching of the data based on the `queryKey`. It also handles background updates and provides
 *   a simple API for managing different states of the request.
 *
 * - **Customization:**
 *   Options like `refetchOnWindowFocus` and `retry` allow you to fine-tune the behavior of your data fetching to fit
 *   the application's needs. For example, disabling refetch on window focus can improve performance in some scenarios.
 *
 * - **Error Handling:**
 *   By setting a retry count, the hook can automatically attempt to recover from transient network errors.
 *
 * **Potential Interview Follow-Up Questions:**
 * - How does React Query's caching mechanism work and why is it beneficial for this project?
 * - Can you explain a scenario where you might want to change the `retry` or `refetchOnWindowFocus` settings?
 * - How would you handle error states or loading states in the components consuming this hook?
 * - What advantages does using Axios with a centralized API instance provide over calling fetch directly?
 */
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';
import { api } from '../api/api';

/*
 * 1. **API Request Setup:**
 *    - The helper function `fetchProducts` is defined as an asynchronous function that sends a GET request
 *      to the '/products' endpoint using an Axios instance (`api`).
 *    - It returns the fetched data, which is typed as an array of `Product`.
 *
 * 2. **Axios API Instance:**
 *    - The `api` instance is created with a base URL and default headers, which include necessary configuration
 *      such as JSON content headers and a custom candidate token from environment variables.
 *    - A timeout of 25 seconds is set to prevent hanging requests.
 */
const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};

/*
 * 3. **Using React Query (`useQuery`):**
 *    - The custom hook `useProducts` calls `useQuery` with a configuration object:
 *       - `queryKey`: A unique key (`['products']`) that React Query uses to cache and identify the query.
 *       - `queryFn`: The function that will be called to fetch the data, in this case, `fetchProducts`.
 *       - `refetchOnWindowFocus: false`: Disables automatic refetching when the window regains focus.
 *       - `retry: 1`: Sets the query to retry once if the request fails.
 *
 * 4. **Return Value:**
 *    - `useQuery` returns an object containing the status of the query (like `data`, `isLoading`, `error`, etc.),
 *      which allows consuming components to respond to different states (loading, error, or successfully loaded data).
 */
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
