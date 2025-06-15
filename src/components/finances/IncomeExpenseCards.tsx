
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IncomeExpenseCards = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription>Income</CardDescription>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-3xl font-bold text-green-600">+$2,456</CardTitle>
            <Badge className="border-transparent bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80 dark:hover:bg-green-900/60">+15.7%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">This week's income</p>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Expense</CardDescription>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-3xl font-bold text-red-600">-$1,124</CardTitle>
            <Badge className="border-transparent bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-100/80 dark:hover:bg-red-900/60">-10.7%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">This week's expense</p>
        </CardHeader>
      </Card>
    </>
  );
};

export default IncomeExpenseCards;
