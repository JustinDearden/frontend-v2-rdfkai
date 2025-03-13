import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { CreateApplication, Application } from '../types';

export const useCreateApplication = (productId: number) => {
  // const queryClient = useQueryClient();
  console.log('useCreateApplication', productId);
  const mutation = useMutation<Application, Error, CreateApplication>({
    mutationFn: async (newApplication: CreateApplication) => {
      const response = await api.post<Application>(
        '/applications',
        newApplication,
      );
      return response.data;
    },
    // onSuccess: (data: Application) => {
    //   // Cache the application using the productId as key.
    //   queryClient.setQueryData(['application', productId], data);
    // },
  });

  return mutation;
};
