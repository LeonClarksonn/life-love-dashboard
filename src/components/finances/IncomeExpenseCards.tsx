
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useFinance";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

const IncomeExpenseCards = () => {
  const { data: transactions, isLoading } = useTransactions();
  
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const weeklyTransactions = transactions?.filter(t => isWithinInterval(new Date(t.date), {start: weekStart, end: weekEnd}));

  const weeklyIncome = weeklyTransactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0) ?? 0;
  const weeklyExpense = weeklyTransactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) ?? 0;

  if (isLoading) {
    return (
        <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">Income</p>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-3xl font-bold text-green-600">
                +{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyIncome)}
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">This week's income</p>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">Expense</p>
          <div className="flex items-baseline gap-2">
            <CardTitle className="text-3xl font-bold text-red-600">
                -{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weeklyExpense)}
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">This week's expense</p>
        </CardHeader>
      </Card>
    </>
  );
};

export default IncomeExpenseCards;
