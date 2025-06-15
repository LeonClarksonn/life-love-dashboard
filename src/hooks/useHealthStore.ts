
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HealthState {
  steps: number;
  setSteps: (steps: number) => void;
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      steps: 4500,
      setSteps: (steps) => set({ steps }),
    }),
    {
      name: 'health-storage',
    }
  )
);
