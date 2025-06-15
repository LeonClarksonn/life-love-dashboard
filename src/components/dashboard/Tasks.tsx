
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { type Database } from '@/integrations/supabase/types';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type Task = Database['public']['Tables']['tasks']['Row'];

const Tasks = ({ title = "Today's Focus" }: { title?: string }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState('');

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (error) {
        toast({ title: "Error fetching tasks", description: error.message, variant: "destructive" });
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!user,
  });

  const addTaskMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!user) throw new Error("User not logged in");
      const { data, error } = await supabase
        .from('tasks')
        .insert({ text, user_id: user.id })
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      setNewTask('');
      toast({ title: "Success", description: "Task added." });
    },
    onError: (error) => {
       toast({ title: "Error adding task", description: error.message, variant: "destructive" });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
    onError: (error) => {
       toast({ title: "Error updating task", description: error.message, variant: "destructive" });
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
       toast({ title: "Success", description: "Task deleted." });
    },
    onError: (error) => {
       toast({ title: "Error deleting task", description: error.message, variant: "destructive" });
    }
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTaskMutation.mutate(newTask.trim());
    }
  };

  const toggleTask = (task: Task) => {
    updateTaskMutation.mutate(task);
  };
  
  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Add a new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            disabled={addTaskMutation.isPending || !user}
          />
          <Button onClick={handleAddTask} disabled={addTaskMutation.isPending || !user}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {isLoading && !!user ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <ul>
            {tasks?.map(task => (
              <li key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary group">
                <div className="flex items-center">
                  <Checkbox 
                    id={`task-${task.id}`} 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task)}
                    disabled={updateTaskMutation.isPending}
                  />
                  <label 
                    htmlFor={`task-${task.id}`}
                    className={`ml-3 text-sm font-medium transition-colors ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                  >
                    {task.text}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity" disabled={deleteTaskMutation.isPending}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default Tasks;
