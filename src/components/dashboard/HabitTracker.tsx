
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useHabits, habitIcons, HabitIcon } from '@/hooks/useHabits';
import { Skeleton } from "@/components/ui/skeleton";

const HabitTracker = () => {
  const { habits, toggleHabit, isLoading } = useHabits();
  const habitsToShow = habits.slice(0, 4);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Daily Habits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Daily Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habitsToShow.map(habit => {
            const Icon = habitIcons[habit.icon as HabitIcon];
            return (
              <div key={habit.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-3 text-primary" />
                  <span className={`text-sm font-medium transition-colors ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{habit.name}</span>
                </div>
                <Checkbox 
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit({ id: habit.id, completed: habit.completed })}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
