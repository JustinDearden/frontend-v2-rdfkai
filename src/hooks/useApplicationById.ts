// Import necessary hooks from React Query and our API client.
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { Application } from '../types';

/**
 * Custom hook to fetch a single application by its ID using React Query.
 *
 * This hook performs the following operations:
 *
 * 1. **Query Key:**
 *    - The query key is an array `['application', applicationId]`, which uniquely identifies the query in the cache.
 *      This helps React Query manage caching and re-fetching the data when needed.
 *
 * 2. **Query Function (`queryFn`):**
 *    - The asynchronous function defined as the `queryFn` fetches the application data.
 *    - It first checks if `applicationId` is provided; if not, it throws an error.
 *    - If an ID is available, it makes a GET request to the `/applications/${applicationId}` endpoint using Axios.
 *    - The function returns the response data, which should conform to the `Application` type.
 *
 * 3. **Enabled Option:**
 *    - The `enabled` option is set to `!!applicationId`. This means the query will only run if `applicationId` is truthy.
 *      This is useful for scenarios where the ID might be undefined at first (e.g., before data is available) and prevents
 *      unnecessary requests.
 *
 * **Key Concepts to Discuss:**
 *
 * - **Conditional Query Execution:**
 *   - The `enabled` flag ensures that the query function runs only when a valid application ID is provided.
 *
 * - **Error Handling:**
 *   - The query function explicitly throws an error if `applicationId` is not provided, which is useful for debugging and
 *     ensuring that the hook is used correctly.
 *
 * - **Cache Management:**
 *   - Using a unique query key helps React Query cache the data effectively, making subsequent queries faster and reducing
 *     unnecessary network requests.
 */
export const useApplicationById = (applicationId?: string) => {
  return useQuery<Application>({
    // Unique query key consisting of a static key and the application ID.
    queryKey: ['application', applicationId],
    // Query function that fetches the application data.
    queryFn: async () => {
      // Ensure that an applicationId is provided.
      if (!applicationId) throw new Error('Application ID is required');
      // Make a GET request to fetch the application data.
      const response = await api.get<Application>(
        `/applications/${applicationId}`,
      );
      // Return the fetched application data.
      return response.data;
    },
    // The query will only run if the applicationId is truthy.
    enabled: !!applicationId,
  });
};
