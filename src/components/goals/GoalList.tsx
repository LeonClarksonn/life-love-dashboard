
import { CheckCircle2, Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Goal } from "@/hooks/useGoals";

interface GoalListProps {
  goals: Goal[];
  onToggleGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  isLoading?: boolean;
}

const GoalList = ({ goals, onToggleGoal, onDeleteGoal, isLoading = false }: GoalListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 pt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return <p className="text-muted-foreground text-sm text-center py-4">No goals yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-4">
      {goals.map(goal => (
        <li key={goal.id} className="flex items-center">
          <button onClick={() => onToggleGoal(goal.id)} className="flex items-start flex-grow text-left">
            {goal.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
            ) : (
              <Target className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
            )}
            <div>
              <p className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                {goal.text}
              </p>
            </div>
          </button>
          <Button variant="ghost" size="icon" onClick={() => onDeleteGoal(goal.id)}>
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
