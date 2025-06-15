
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGoals, type Goal } from "@/hooks/useGoals";
import { CheckCircle2, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const GoalItem = ({ goal }: { goal: Goal }) => (
  <li className="flex items-center gap-2">
    {goal.completed ? (
      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
    ) : (
      <Target className="h-4 w-4 text-primary flex-shrink-0" />
    )}
    <p className={`text-sm ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
      {goal.text}
    </p>
  </li>
);

const GoalsOverview = () => {
  const { monthlyGoals, yearlyGoals, isLoading } = useGoals();

  const monthlyGoalsToShow = monthlyGoals.slice(0, 3);
  const yearlyGoalsToShow = yearlyGoals.slice(0, 3);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Goals Overview</CardTitle>
          <Button asChild variant="ghost" size="sm">
              <Link to="/goals">View All</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
           <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Goals Overview</CardTitle>
        <Button asChild variant="ghost" size="sm">
            <Link to="/goals">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 text-sm">Monthly Goals</h4>
          {monthlyGoalsToShow.length > 0 ? (
            <ul className="space-y-1">
              {monthlyGoalsToShow.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No monthly goals yet.</p>
          )}
        </div>
        <div>
          <h4 className="font-medium mb-2 text-sm">Yearly Goals</h4>
          {yearlyGoalsToShow.length > 0 ? (
            <ul className="space-y-1">
              {yearlyGoalsToShow.map(goal => <GoalItem key={goal.id} goal={goal} />)}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No yearly goals yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsOverview;
