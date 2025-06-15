
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Bed, Plus } from "lucide-react";

const formSchema = z.object({
  hours: z.coerce.number().positive({ message: "Please enter a positive number." }),
});

const SleepTracker = () => {
  const dailyGoal = 8;
  
  const [sleepHours, setSleepHours] = useState(() => {
    const savedDate = localStorage.getItem('dailySleepHoursDate');
    const today = new Date().toISOString().slice(0, 10);
    if (savedDate === today) {
        const savedHours = localStorage.getItem('dailySleepHours');
        return savedHours ? JSON.parse(savedHours) : 0;
    }
    return 0;
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('dailySleepHoursDate', today);
    localStorage.setItem('dailySleepHours', JSON.stringify(sleepHours));
  }, [sleepHours]);

  const progress = Math.min(100, (sleepHours / dailyGoal) * 100);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hours: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSleepHours(currentHours => currentHours + values.hours);
    form.reset({ hours: undefined });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-6 w-6" /> 
          Sleep Tracker
        </CardTitle>
        <CardDescription>Your daily goal is {dailyGoal} hours.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
            <p className="text-3xl font-bold">{sleepHours.toFixed(1)} <span className="text-xl text-muted-foreground">hours</span></p>
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
              name="hours"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="Add hours" {...field} />
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

export default SleepTracker;
