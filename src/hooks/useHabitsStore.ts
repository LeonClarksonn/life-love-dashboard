
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flame, Droplets, Bed, BookOpen, Dumbbell, Activity } from "lucide-react";

export const habitIcons = {
  Flame: Flame,
  Droplets: Droplets,
  BookOpen: BookOpen,
  Bed: Bed,
  Dumbbell: Dumbbell,
  Activity: Activity,
};

export type HabitIcon = keyof typeof habitIcons;

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  completed: boolean;
}

interface HabitsStore {
  habits: Habit[];
  toggleHabit: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completed'>) => void;
}

const initialHabits: Habit[] = [
  { id: '1', name: 'Exercise', icon: 'Flame', completed: false },
  { id: '2', name: '8 glasses of water', icon: 'Droplets', completed: true },
  { id: '3', name: 'Read for 15 mins', icon: 'BookOpen', completed: false },
  { id: '4', name: '8 hours of sleep', icon: 'Bed', completed: false },
];

export const useHabitsStore = create<HabitsStore>()(
  persist(
    (set) => ({
      habits: initialHabits,
      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
          ),
        })),
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            { ...habit, id: crypto.randomUUID(), completed: false },
          ],
        })),
    }),
    {
      name: 'habits-storage',
    }
  )
);
