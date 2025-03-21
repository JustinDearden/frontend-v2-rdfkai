/**
 * Custom hook for creating an application using React Query's mutation functionality.
 *
 * This hook handles the process of sending a POST request to create an application,
 * and then updates the query cache accordingly.
 *
 * 1. **Setting Up the Query Client:**
 *    - The hook first calls `useQueryClient()` to access the query client instance.
 *      This instance allows you to interact with React Query's cache, enabling you to update or invalidate queries.
 *
 * 2. **Defining the Mutation with `useMutation`:**
 *    - `useMutation` is used to define an asynchronous mutation operation.
 *      It takes a generic type signature defining:
 *        - The expected data type of the response (`Application`).
 *        - The type of error that might be thrown (`Error`).
 *        - The payload type that the mutation function will accept (`CreateApplicationPayload`).
 *
 * 3. **Mutation Function (`mutationFn`):**
 *    - The `mutationFn` is an asynchronous function that takes the payload (in this case, an object containing `productId`).
 *    - It uses Axios (`api.post`) to send a POST request to the `/applications` endpoint, passing the payload.
 *    - The function returns the response data, which is typed as `Application`.
 *
 * 4. **Handling Successful Mutations (`onSuccess`):**
 *    - Once the mutation succeeds, the `onSuccess` callback is triggered with the returned data.
 *    - Inside `onSuccess`, two cache-related operations are performed:
 *       a. **Cache Update:**
 *          - `queryClient.setQueryData(['application', data.id], data)` manually updates the cache for the specific query key
 *            that represents the created application. This ensures that any component using this query key gets the updated data immediately.
 *
 *       b. **Cache Invalidation:**
 *          - `queryClient.invalidateQueries({ queryKey: ['applications'] })` marks the cached queries under the key `['applications']` as stale.
 *            This triggers a refetch of any lists or data that depend on the applications, ensuring that the UI displays the latest information.
 *
 * **Key Concepts to Discuss:**
 *
 * - **useMutation vs. useQuery:**
 *   - `useMutation` is typically used for operations that modify data (POST, PUT, DELETE), whereas `useQuery` is used for fetching data.
 *
 * - **Query Client and Cache Management:**
 *   - How manually updating the cache with `setQueryData` and invalidating queries with `invalidateQueries`
 *     helps in keeping the UI in sync with the backend after a mutation.
 *
 * - **Error Handling and Optimistic Updates:**
 *   - While not shown here, you might be asked how to handle errors or implement optimistic updates to provide immediate UI feedback.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Application } from '../types';

export type CreateApplicationPayload = {
  productId: number;
};

export const useCreateApplication = () => {
  /*
  - The hook first calls `useQueryClient()` to access the query client instance.
  * This instance allows you to interact with React Query's cache, enabling you to update or invalidate queries.
  */
  const queryClient = useQueryClient();

  /*
   **Defining the Mutation with `useMutation`:**
   *    - `useMutation` is used to define an asynchronous mutation operation.
   *      It takes a generic type signature defining:
   *        - The expected data type of the response (`Application`).
   *        - The type of error that might be thrown (`Error`).
   *        - The payload type that the mutation function will accept (`CreateApplicationPayload`).
   */
  return useMutation<Application, Error, CreateApplicationPayload>({
    mutationFn: async ({ productId }: CreateApplicationPayload) => {
      const { data } = await api.post<Application>('/applications', {
        productId,
      });
      return data;
    },
    // onSuccess: Callback function that runs after a successful mutation.
    // It performs two cache operations:
    // 1. Updates the cache with the new application data using its unique query key.
    // 2. Invalidates the 'applications' query to ensure any list of applications is refetched.
    onSuccess: (data) => {
      // Update the cache for the specific application that was just created.
      queryClient.setQueryData(['application', data.id], data);
      // Invalidate queries with the key 'applications' so that the list gets refreshed with the latest data.
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
