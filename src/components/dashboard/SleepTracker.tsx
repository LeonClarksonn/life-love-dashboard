
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Bed, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subDays } from 'date-fns';

const formSchema = z.object({
  hours: z.coerce.number().positive({ message: "Please enter a positive number." }),
});

const SleepTracker = () => {
  const dailyGoal = 9;

  const [sleepData, setSleepData] = useState<{ [key: string]: number }>(() => {
    try {
      const savedData = localStorage.getItem('weeklySleepData');
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error("Error parsing sleep data from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('weeklySleepData', JSON.stringify(sleepData));
  }, [sleepData]);

  const todayString = format(new Date(), 'yyyy-MM-dd');
  const sleepHours = sleepData[todayString] || 0;

  const progress = Math.min(100, (sleepHours / dailyGoal) * 100);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hours: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSleepData(currentData => {
        const currentHours = currentData[todayString] || 0;
        return {
            ...currentData,
            [todayString]: currentHours + values.hours
        };
    });
    form.reset({ hours: undefined });
  }

  const weeklyData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateString = format(date, 'yyyy-MM-dd');
        data.push({
            name: format(date, 'EEE'),
            hours: sleepData[dateString] || 0,
        });
    }
    return data;
  }, [sleepData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-6 w-6" /> 
          Sleep Tracker
        </CardTitle>
        <CardDescription>Log your sleep to see your weekly progress. Daily goal: {dailyGoal} hours.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h4 className="text-lg font-medium mb-2">This Week's Sleep</h4>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} dy={10} />
                        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={30} />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--accent))', radius: 4 }}
                            contentStyle={{
                                background: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: '0.5rem',
                            }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                            itemStyle={{ color: "hsl(var(--primary))" }}
                            formatter={(value: number) => [`${value.toFixed(1)} hours`, "Sleep"]}
                        />
                        <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="space-y-4">
            <h4 className="text-lg font-medium">Log Today's Sleep</h4>
            <div className="flex items-center justify-between gap-4">
                <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-baseline">
                        <p className="text-2xl font-bold">{sleepHours.toFixed(1)} <span className="text-lg text-muted-foreground">hours</span></p>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}% of goal</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                </div>
            </div>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 pt-2">
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="Add hours..." {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
            </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
