
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Goal } from '@/components/goals/GoalList';

type GoalType = 'daily' | 'monthly' | 'yearly';

interface GoalsState {
  dailyGoals: Goal[];
  monthlyGoals: Goal[];
  yearlyGoals: Goal[];
  addGoal: (text: string, type: GoalType) => void;
  toggleGoal: (id: number, type: GoalType) => void;
  deleteGoal: (id: number, type: GoalType) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      dailyGoals: [],
      monthlyGoals: [],
      yearlyGoals: [],
      addGoal: (text, type) => {
        const newGoal: Goal = {
          id: Date.now(),
          text,
          completed: false,
        };
        if (type === 'daily') {
          set((state) => ({ dailyGoals: [newGoal, ...state.dailyGoals] }));
        } else if (type === 'monthly') {
          set((state) => ({ monthlyGoals: [newGoal, ...state.monthlyGoals] }));
        } else {
          set((state) => ({ yearlyGoals: [newGoal, ...state.yearlyGoals] }));
        }
      },
      toggleGoal: (id, type) =>
        set((state) => {
          const toggle = (goals: Goal[]) => goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
          if (type === 'daily') return { dailyGoals: toggle(state.dailyGoals) };
          if (type === 'monthly') return { monthlyGoals: toggle(state.monthlyGoals) };
          return { yearlyGoals: toggle(state.yearlyGoals) };
        }),
      deleteGoal: (id, type) =>
        set((state) => {
          const filter = (goals: Goal[]) => goals.filter(g => g.id !== id);
          if (type === 'daily') return { dailyGoals: filter(state.dailyGoals) };
          if (type === 'monthly') return { monthlyGoals: filter(state.monthlyGoals) };
          return { yearlyGoals: filter(state.yearlyGoals) };
        }),
    }),
    {
      name: 'goals-storage',
    }
  )
);
