
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AddGoalForm from './AddGoalForm';
import GoalList, { type Goal } from './GoalList';

const Goals = () => {
  const [dailyGoals, setDailyGoals] = useState<Goal[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<Goal[]>([]);
  const [yearlyGoals, setYearlyGoals] = useState<Goal[]>([]);

  const addGoal = (text: string, type: 'daily' | 'monthly' | 'yearly') => {
    const newGoal: Goal = {
      id: Date.now(),
      text,
      completed: false,
    };
    if (type === 'daily') {
      setDailyGoals(prev => [newGoal, ...prev]);
    } else if (type === 'monthly') {
      setMonthlyGoals(prev => [newGoal, ...prev]);
    } else {
      setYearlyGoals(prev => [newGoal, ...prev]);
    }
  };

  const toggleGoal = (id: number, type: 'daily' | 'monthly' | 'yearly') => {
    const setGoals = type === 'daily' ? setDailyGoals : type === 'monthly' ? setMonthlyGoals : setYearlyGoals;
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: number, type: 'daily' | 'monthly' | 'yearly') => {
    const setGoals = type === 'daily' ? setDailyGoals : type === 'monthly' ? setMonthlyGoals : setYearlyGoals;
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

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
