import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';
import { api } from '../api/api';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/products');
  return data;
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
