import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { CreateApplication, Application } from '../types';

export const useCreateApplication = (productId: number) => {
  const queryClient = useQueryClient();
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // Clear any existing application cache when this hook runs
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['application', productId] });
  }, [productId, queryClient]);

  const mutation = useMutation<Application, Error, CreateApplication>({
    mutationFn: async (newApplication: CreateApplication) => {
      const response = await api.post<Application>(
        '/applications',
        newApplication,
      );
      return response.data;
    },
    onSuccess: (data: Application) => {
      setApplicationId(data.id);
      // Store application data in the cache
      queryClient.setQueryData(['application', productId], data);
    },
  });

  // Automatically trigger application creation
  useEffect(() => {
    mutation.mutate({ productId });
  }, [mutation, productId]);

  return { ...mutation, applicationId };
};
