
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddGoalForm from './AddGoalForm';
import GoalList from './GoalList';
import { useGoalsStore } from "@/hooks/useGoalsStore";

const Goals = () => {
  const { 
    dailyGoals, 
    monthlyGoals, 
    yearlyGoals, 
    addGoal, 
    toggleGoal, 
    deleteGoal 
  } = useGoalsStore();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Daily Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm onAddGoal={(text) => addGoal(text, 'daily')} placeholder="What is your main goal for today?" />
          <GoalList goals={dailyGoals} onToggleGoal={(id) => toggleGoal(id, 'daily')} onDeleteGoal={(id) => deleteGoal(id, 'daily')} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm onAddGoal={(text) => addGoal(text, 'monthly')} placeholder="Add a monthly goal..." />
          <GoalList goals={monthlyGoals} onToggleGoal={(id) => toggleGoal(id, 'monthly')} onDeleteGoal={(id) => deleteGoal(id, 'monthly')} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Yearly Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm onAddGoal={(text) => addGoal(text, 'yearly')} placeholder="Add a yearly goal..." />
          <GoalList goals={yearlyGoals} onToggleGoal={(id) => toggleGoal(id, 'yearly')} onDeleteGoal={(id) => deleteGoal(id, 'yearly')} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;
