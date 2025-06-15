
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Target } from "lucide-react";

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

const initialGoals: Goal[] = [
  { id: 1, text: 'Learn to play the guitar', completed: false },
  { id: 2, text: 'Run a 5k marathon', completed: false },
  { id: 3, text: 'Save $1,000 for vacation', completed: true },
];

const Goals = ({ title = "Your Goals" }: { title?: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Track your long-term and short-term objectives.</p>
        <ul className="space-y-4">
          {initialGoals.map(goal => (
            <li key={goal.id} className="flex items-start">
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
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Goals;
