import Sidebar from "@/components/layout/Sidebar";
import TotalBalanceCard from "@/components/finances/TotalBalanceCard";
import IncomeExpenseCards from "@/components/finances/IncomeExpenseCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevenueChart from "@/components/finances/RevenueChart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import RecentTransactions from "@/components/finances/RecentTransactions";
import { AddTransactionDialog } from "@/components/finances/AddTransactionDialog";
import AccountList from "@/components/finances/AccountList";

const Finances = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto">
        <header className="md:hidden flex justify-between items-center mb-4">
          <h1 className="font-serif text-xl font-bold text-primary">Life Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold">Finances</h2>
            <p className="text-muted-foreground mt-1">Here's an overview of your financial status.</p>
          </div>
          <AddTransactionDialog />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <CardContent className="p-0">
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <IncomeExpenseCards />
            <Card>
              <CardHeader>
                <CardTitle>My Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <AccountList />
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
