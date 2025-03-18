import { useQuery } from '@tanstack/react-query';
import { Application } from '../types';
import { api } from '../api/api';

const fetchApplications = async (): Promise<Application[]> => {
  const { data } = await api.get<Application[]>('/applications');
  return data;
};

export const useApplications = () => {
  return useQuery<Application[]>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
