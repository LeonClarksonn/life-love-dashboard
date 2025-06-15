
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";

const formSchema = z.object({
  steps: z.coerce.number().int().positive({ message: "Please enter a positive number." }),
});

const StepTracker = () => {
  const dailyGoal = 10000;
  
  const [steps, setSteps] = useState(() => {
    const savedDate = localStorage.getItem('dailyStepsDate');
    const today = new Date().toISOString().slice(0, 10);
    if (savedDate === today) {
        const savedSteps = localStorage.getItem('dailySteps');
        return savedSteps ? JSON.parse(savedSteps) : 0;
    }
    return 0;
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('dailyStepsDate', today);
    localStorage.setItem('dailySteps', JSON.stringify(steps));
  }, [steps]);

  const progress = Math.min(100, (steps / dailyGoal) * 100);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      steps: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSteps(currentSteps => currentSteps + values.steps);
    form.reset({steps: undefined});
  }
  
  const formatter = new Intl.NumberFormat('en-US');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step Tracker</CardTitle>
        <CardDescription>Your daily goal is {formatter.format(dailyGoal)} steps.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
            <p className="text-3xl font-bold">{formatter.format(steps)}</p>
        </div>
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 pt-2">
            <FormField
              control={form.control}
              name="steps"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input type="number" placeholder="Add steps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StepTracker;
