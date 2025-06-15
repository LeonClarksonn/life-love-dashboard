
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Flame, Droplets, Bed, BookOpen } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  icon: React.ElementType;
  completed: boolean;
}

const initialHabits: Habit[] = [
  { id: 1, name: 'Exercise', icon: Flame, completed: false },
  { id: 2, name: '8 glasses of water', icon: Droplets, completed: true },
  { id: 3, name: 'Read for 15 mins', icon: BookOpen, completed: false },
  { id: 4, name: '8 hours of sleep', icon: Bed, completed: false },
];

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, completed: !habit.completed } : habit));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.map(habit => (
            <div key={habit.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
              <div className="flex items-center">
                <habit.icon className="h-5 w-5 mr-3 text-primary" />
                <span className={`text-sm font-medium transition-colors ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{habit.name}</span>
              </div>
              <Checkbox 
                checked={habit.completed}
                onCheckedChange={() => toggleHabit(habit.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
