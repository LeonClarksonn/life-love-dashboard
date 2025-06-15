
import Sidebar from "@/components/layout/Sidebar";
import Greeting from "@/components/dashboard/Greeting";
import QuoteCard from "@/components/dashboard/QuoteCard";
import Tasks from "@/components/dashboard/Tasks";
import HabitTracker from "@/components/dashboard/HabitTracker";
import GoalsOverview from "@/components/dashboard/GoalsOverview";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <Greeting />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Tasks />
          </div>
          <div className="space-y-8">
            <HabitTracker />
            <GoalsOverview />
          </div>
        </div>
        <div className="mt-8">
          <QuoteCard />
        </div>
      </main>
    </div>
  );
};

export default Index;
