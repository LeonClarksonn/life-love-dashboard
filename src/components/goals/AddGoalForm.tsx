
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1, { message: "Goal cannot be empty." }),
});

interface AddGoalFormProps {
  onAddGoal: (text: string) => void;
  placeholder: string;
  isPending: boolean;
}

const AddGoalForm = ({ onAddGoal, placeholder, isPending }: AddGoalFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddGoal(values.text);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 mb-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </Button>
      </form>
    </Form>
  );
};

export default AddGoalForm;
