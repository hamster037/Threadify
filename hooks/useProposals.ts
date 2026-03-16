import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Proposal } from '../types';
import { useAuthStore } from '../stores/authStore';

export const useProposalsForRequest = (requestId: string) => {
  return useQuery({
    queryKey: ['proposals', 'request', requestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*, tailor:users!tailor_id(*, tailor_profile:tailor_profiles(*))')
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Proposal[];
    },
    enabled: !!requestId,
  });
};

export const useMyProposals = () => {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['proposals', 'mine', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*, request:requests(*)')
        .eq('tailor_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Proposal[];
    },
    enabled: !!user?.id,
  });
};

export const useCreateProposal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (proposal: Partial<Proposal>) => {
      const { data, error } = await supabase
        .from('proposals')
        .insert(proposal)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });
};

export const useUpdateProposalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from('proposals')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
    },
  });
};
