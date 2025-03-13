// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { api } from '../api/api';
// import { CreateApplication, Application } from '../types';

// export const useCreateApplication = (productId: number) => {
//   // const queryClient = useQueryClient();
//   console.log('useCreateApplication', productId);
//   const mutation = useMutation<Application, Error, CreateApplication>({
//     mutationFn: async (newApplication: CreateApplication) => {
//       const response = await api.post<Application>(
//         '/applications',
//         newApplication,
//       );
//       return response.data;
//     },
//     // onSuccess: (data: Application) => {
//     //   // Cache the application using the productId as key.
//     //   queryClient.setQueryData(['application', productId], data);
//     // },
//   });

//   return mutation;
// };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Application } from '../types';

type CreateApplicationPayload = {
  productId: number;
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId }: CreateApplicationPayload) => {
      const response = await api.post<Application>('/applications', {
        productId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Cache the new application
      queryClient.setQueryData(['application', data.id], data);
      // Invalidate the applications list to refetch it
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
