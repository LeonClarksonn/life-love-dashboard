
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddGoalForm from './AddGoalForm';
import GoalList from './GoalList';
import { useGoals, useAddGoal, useToggleGoal, useDeleteGoal } from "@/hooks/useGoals";

const Goals = () => {
  const { 
    dailyGoals, 
    monthlyGoals, 
    yearlyGoals, 
    isLoading,
    allGoals
  } = useGoals();
  
  const addGoalMutation = useAddGoal();
  const toggleGoalMutation = useToggleGoal();
  const deleteGoalMutation = useDeleteGoal();

  const handleAddGoal = (text: string, type: 'daily' | 'monthly' | 'yearly') => {
    addGoalMutation.mutate({ text, type });
  };

  const handleToggleGoal = (id: string) => {
    const goal = allGoals.find(g => g.id === id);
    if (goal) {
      toggleGoalMutation.mutate({ id: goal.id, completed: !goal.completed });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Daily Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm 
            onAddGoal={(text) => handleAddGoal(text, 'daily')} 
            placeholder="What is your main goal for today?"
            isPending={addGoalMutation.isPending}
          />
          <GoalList 
            goals={dailyGoals} 
            onToggleGoal={handleToggleGoal} 
            onDeleteGoal={(id) => deleteGoalMutation.mutate(id)} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm 
            onAddGoal={(text) => handleAddGoal(text, 'monthly')} 
            placeholder="Add a monthly goal..." 
            isPending={addGoalMutation.isPending}
          />
          <GoalList 
            goals={monthlyGoals} 
            onToggleGoal={handleToggleGoal} 
            onDeleteGoal={(id) => deleteGoalMutation.mutate(id)}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Yearly Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <AddGoalForm 
            onAddGoal={(text) => handleAddGoal(text, 'yearly')} 
            placeholder="Add a yearly goal..." 
            isPending={addGoalMutation.isPending}
          />
          <GoalList 
            goals={yearlyGoals} 
            onToggleGoal={handleToggleGoal} 
            onDeleteGoal={(id) => deleteGoalMutation.mutate(id)}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;
