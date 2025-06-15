
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useHealthStore } from "@/hooks/useHealthStore";

const StepCounter = () => {
  const { steps, setSteps } = useHealthStore();
  const goal = 10000;
  const progress = (steps / goal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Step Goal</CardTitle>
        <CardDescription>Your progress towards 10,000 steps today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
            <p className="text-2xl font-bold">{steps.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">/ {goal.toLocaleString()} steps</p>
        </div>
        <Progress value={progress} />
        <Slider
          defaultValue={[steps]}
          max={goal}
          step={100}
          onValueChange={(value) => setSteps(value[0])}
        />
      </CardContent>
    </Card>
  );
};

export default StepCounter;
