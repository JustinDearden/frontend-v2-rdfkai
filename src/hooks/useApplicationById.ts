import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { Application } from '../types';

export const useApplicationById = (applicationId?: string) => {
  return useQuery<Application>({
    queryKey: ['application', applicationId],
    queryFn: async () => {
      if (!applicationId) throw new Error('Application ID is required');
      const response = await api.get<Application>(
        `/applications/${applicationId}`,
      );
      return response.data;
    },
    enabled: !!applicationId,
  });
};
