// Import necessary hooks from React Query and our API client.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Applicant, Application } from '../types';

// Define the payload type for updating applicants.
export type UpdateApplicantsPayload = {
  applicationId: string;
  applicants: Applicant[];
};

/**
 * Custom hook for updating the applicants of an application using React Query's mutation functionality.
 *
 * This hook performs the following tasks:
 *
 * 1. **Setting Up the Query Client:**
 *    - It calls `useQueryClient()` to get the query client instance, which lets us interact with the React Query cache.
 *
 * 2. **Defining the Mutation with `useMutation`:**
 *    - `useMutation` is used to create a mutation that sends a PUT request to update an application's applicants.
 *    - The generic types provided specify:
 *         - The expected response type (`Application`).
 *         - The error type (`Error`).
 *         - The payload type (`UpdateApplicantsPayload`).
 *
 * 3. **Mutation Function (`mutationFn`):**
 *    - The `mutationFn` is an asynchronous function that accepts the payload containing:
 *         - `applicationId`: The unique identifier of the application to update.
 *         - `applicants`: The updated list of applicants.
 *    - It sends a PUT request to `/applications/${applicationId}` with the `applicants` data.
 *    - The function returns the updated application data from the server.
 *
 * 4. **Handling Successful Mutations (`onSuccess`):**
 *    - Once the mutation is successful, the `onSuccess` callback is executed.
 *    - The callback receives the updated application data and the original payload.
 *    - It then updates the cache for this specific application by calling:
 *         - `queryClient.setQueryData(['application', applicationId], updatedApplication)`
 *    - This ensures that any component querying for this application gets the updated data immediately.
 *
 * **Key Concepts to Discuss:**
 *
 * - **useMutation vs. useQuery:**
 *   - `useMutation` is used for modifying data (PUT, POST, DELETE), whereas `useQuery` is used for data fetching.
 *
 * - **Cache Management:**
 *   - How updating the cache with `setQueryData` helps keep the UI in sync with the server after an update.
 *
 * - **Error Handling:**
 *   - Although not shown in detail here, discussing how errors are handled during the mutation could be a potential follow-up.
 */
export const useUpdateApplicants = () => {
  // Get the query client instance to perform cache operations.
  const queryClient = useQueryClient();

  // Define the mutation using useMutation.
  return useMutation<Application, Error, UpdateApplicantsPayload>({
    // mutationFn: An asynchronous function that updates the applicants of a specific application.
    // It sends a PUT request to update the application with the new applicants array.
    mutationFn: async ({
      applicationId,
      applicants,
    }: UpdateApplicantsPayload) => {
      const { data } = await api.put<Application>(
        `/applications/${applicationId}`,
        { applicants },
      );
      return data;
    },
    // onSuccess: Callback function that runs after a successful mutation.
    // It updates the cache for the specific application using the updated application data.
    onSuccess: (updatedApplication, { applicationId }) => {
      queryClient.setQueryData(
        ['application', applicationId],
        updatedApplication,
      );
    },
  });
};
