import Sidebar from "@/components/layout/Sidebar";
import TotalBalanceCard from "@/components/finances/TotalBalanceCard";
import IncomeExpenseCards from "@/components/finances/IncomeExpenseCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevenueChart from "@/components/finances/RevenueChart";

const Finances = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <h2 className="text-3xl font-bold">Finances</h2>
        <p className="text-muted-foreground mt-1">Here's an overview of your financial status.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <TotalBalanceCard />
            <Card>
              <CardHeader>
                <CardTitle>Revenue Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm">
                  See All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Transaction list coming soon!</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <IncomeExpenseCards />
            <Card>
              <CardHeader>
                <CardTitle>My Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Card list coming soon!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expense Split</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chart coming soon!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Subscriptions list coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Finances;
