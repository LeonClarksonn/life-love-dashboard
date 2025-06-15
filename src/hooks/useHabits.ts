
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Flame, Droplets, Bed, BookOpen, Dumbbell, Activity } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tables } from '@/integrations/supabase/types';

export const habitIcons = {
  Flame,
  Droplets,
  BookOpen,
  Bed,
  Dumbbell,
  Activity,
};

export type HabitIcon = keyof typeof habitIcons;
export type Habit = Tables<'habits'>;

const fetchHabits = async (userId: string) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching habits:', error);
    throw new Error(error.message);
  }
  return data;
};

const addHabit = async ({ name, icon, userId }: { name: string; icon: HabitIcon; userId: string }) => {
    const { data, error } = await supabase
        .from('habits')
        .insert([{ name, icon, user_id: userId }])
        .select()
        .single();

    if (error) {
      console.error('Error adding habit:', error);
      throw new Error(error.message);
    }
    return data;
};

const toggleHabit = async ({ id, completed }: { id: string, completed: boolean }) => {
    const { data, error } = await supabase
        .from('habits')
        .update({ completed: !completed })
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
      console.error('Error toggling habit:', error);
      throw new Error(error.message);
    }
    return data;
};

export const useHabits = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: habits, isLoading, error } = useQuery({
        queryKey: ['habits', user?.id],
        queryFn: () => fetchHabits(user!.id),
        enabled: !!user,
    });

    const addHabitMutation = useMutation({
        mutationFn: (newHabit: { name: string; icon: HabitIcon; }) => addHabit({ ...newHabit, userId: user!.id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
            toast({ title: "Success", description: "New habit added." });
        },
        onError: (error: Error) => {
             toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });

    const toggleHabitMutation = useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) => toggleHabit({ id, completed }),
        onMutate: async (updatedHabit) => {
          await queryClient.cancelQueries({ queryKey: ['habits', user?.id] });
          const previousHabits = queryClient.getQueryData<Habit[]>(['habits', user?.id]);
          
          if (previousHabits) {
            queryClient.setQueryData<Habit[]>(['habits', user?.id], (old) => 
                old?.map(habit => habit.id === updatedHabit.id ? { ...habit, completed: !habit.completed } : habit) ?? []
            );
          }
          return { previousHabits };
        },
        onError: (err, variables, context) => {
          if (context?.previousHabits) {
            queryClient.setQueryData(['habits', user?.id], context.previousHabits);
          }
          toast({ title: "Error", description: "Could not update habit.", variant: "destructive" });
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['habits', user?.id] });
        }
    });

    return {
        habits: habits ?? [],
        isLoading,
        error: error,
        addHabit: addHabitMutation.mutate,
        toggleHabit: toggleHabitMutation.mutate,
    };
};
