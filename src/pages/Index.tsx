
import Sidebar from "@/components/layout/Sidebar";
import Greeting from "@/components/dashboard/Greeting";
import QuoteCard from "@/components/dashboard/QuoteCard";
import Tasks from "@/components/dashboard/Tasks";
import HabitTracker from "@/components/dashboard/HabitTracker";
import GoalsOverview from "@/components/dashboard/GoalsOverview";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SleepTracker from "@/components/dashboard/SleepTracker";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
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
        <Greeting />
        <div className="mt-8">
          <QuoteCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SleepTracker />
              <GoalsOverview />
            </div>
            <Tasks />
          </div>
          <div className="space-y-8">
            <HabitTracker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
