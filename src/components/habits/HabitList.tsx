
import { useHabitsStore, habitIcons } from "@/hooks/useHabitsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const HabitList = () => {
  const { habits, toggleHabit } = useHabitsStore();

  if (habits.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No habits yet. Add one to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.map(habit => {
            const Icon = habitIcons[habit.icon];
            return (
              <div key={habit.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                <div className="flex items-center">
                  <Icon className="h-5 w-5 mr-3 text-primary" />
                  <span className={`text-sm font-medium transition-colors ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{habit.name}</span>
                </div>
                <Checkbox 
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(habit.id)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitList;
