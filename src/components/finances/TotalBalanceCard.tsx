
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useAccounts } from "@/hooks/useFinance";
import { Skeleton } from "@/components/ui/skeleton";

const TotalBalanceCard = () => {
  const { data: accounts, isLoading } = useAccounts();

  const totalBalance = accounts?.reduce((sum, account) => sum + Number(account.balance), 0) ?? 0;

  return (
    <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground border-none">
      <CardHeader>
        <CardDescription className="text-primary-foreground/80">Total balance</CardDescription>
        {isLoading ? (
          <Skeleton className="h-10 w-48 bg-white/20" />
        ) : (
          <CardTitle className="text-4xl font-bold">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBalance)}
          </CardTitle>
        )}
        <p className="text-sm text-primary-foreground/80">Across {accounts?.length || 0} accounts</p>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">Transfer</Button>
        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground">Top Up</Button>
        <Button variant="ghost" size="icon" className="hover:bg-white/20">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalBalanceCard;
