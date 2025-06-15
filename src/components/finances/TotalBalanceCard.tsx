
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const TotalBalanceCard = () => {
  return (
    <Card className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 border-none">
      <CardHeader>
        <CardDescription>Total balance</CardDescription>
        <CardTitle className="text-4xl font-bold">$120,456.50</CardTitle>
        <p className="text-sm text-green-600 dark:text-green-400">+$2,456 from last month</p>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button>Transfer</Button>
        <Button variant="secondary">Top Up</Button>
        <Button variant="ghost" size="icon">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalBalanceCard;
