import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Order } from '../types';
import { useAuthStore } from '../stores/authStore';

export const useMyOrders = () => {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const filterField = role === 'customer' ? 'customer_id' : 'tailor_id';

  return useQuery({
    queryKey: ['orders', 'mine', user?.id, role],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customer:users!customer_id(*), tailor:users!tailor_id(*), request:requests(*)')
        .eq(filterField, user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user?.id,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customer:users!customer_id(*), tailor:users!tailor_id(*, tailor_profile:tailor_profiles(*)), request:requests(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Order;
    },
    enabled: !!id,
  });
};

export const useOrderUpdates = (orderId: string) => {
  return useQuery({
    queryKey: ['order_updates', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_updates')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, note }: { id: string; status: string; note?: string }) => {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (updateError) throw updateError;

      const user = useAuthStore.getState().user;
      const { error: logError } = await supabase.from('order_updates').insert({
        order_id: id,
        status,
        note: note || null,
        created_by: user?.id,
      });
      if (logError) throw logError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order_updates'] });
    },
  });
};
