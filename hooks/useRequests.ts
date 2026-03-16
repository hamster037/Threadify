import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { ClothingRequest } from '../types';
import { useAuthStore } from '../stores/authStore';

export const useMyRequests = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['requests', 'mine', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('customer_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ClothingRequest[];
    },
    enabled: !!user?.id,
  });
};

export const useOpenRequests = () => {
  return useQuery({
    queryKey: ['requests', 'open'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ClothingRequest[];
    },
  });
};

export const useRequest = (id: string) => {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as ClothingRequest;
    },
    enabled: !!id,
  });
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: Partial<ClothingRequest>) => {
      const { data, error } = await supabase
        .from('requests')
        .insert(request)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });
};
