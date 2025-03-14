import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { Application } from '../types';

export type CreateApplicationPayload = {
  productId: number;
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<Application, Error, CreateApplicationPayload>({
    mutationFn: async ({ productId }: CreateApplicationPayload) => {
      const { data } = await api.post<Application>('/applications', {
        productId,
      });
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['application', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
