
import Sidebar from "@/components/layout/Sidebar";
import HabitManager from "@/components/habits/HabitManager";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HabitsPage = () => {
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

        <h2 className="text-3xl font-bold">Habits</h2>
        <p className="text-muted-foreground mt-1">Track and manage your daily and weekly habits.</p>
        <div className="mt-8">
            <HabitManager />
        </div>
      </main>
    </div>
  );
};

export default HabitsPage;
