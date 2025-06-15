
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

export type Goal = Database['public']['Tables']['goals']['Row'];
type GoalType = 'daily' | 'monthly' | 'yearly';

const fetchGoals = async (userId: string): Promise<Goal[]> => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const useGoals = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery<Goal[], Error>({
    queryKey: ['goals', user?.id],
    queryFn: () => fetchGoals(user!.id),
    enabled: !!user,
  });

  if (error) {
    toast({ title: "Error fetching goals", description: error.message, variant: "destructive" });
  }

  const dailyGoals = data?.filter(goal => goal.type === 'daily') || [];
  const monthlyGoals = data?.filter(goal => goal.type === 'monthly') || [];
  const yearlyGoals = data?.filter(goal => goal.type === 'yearly') || [];

  return { dailyGoals, monthlyGoals, yearlyGoals, isLoading, allGoals: data || [] };
};

export const useAddGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ text, type }: { text: string, type: GoalType }) => {
      if (!user) throw new Error("User not authenticated");
      const { data, error } = await supabase
        .from('goals')
        .insert([{ text, type, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', user?.id] });
      toast({ title: "Goal added!" });
    },
    onError: (error) => {
      toast({ title: "Error adding goal", description: error.message, variant: "destructive" });
    },
  });
};

export const useToggleGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string, completed: boolean }) => {
      const { error } = await supabase
        .from('goals')
        .update({ completed })
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', user?.id] });
    },
    onError: (error) => {
      toast({ title: "Error updating goal", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals', user?.id] });
      toast({ title: "Goal deleted" });
    },
    onError: (error) => {
      toast({ title: "Error deleting goal", description: error.message, variant: "destructive" });
    },
  });
};
