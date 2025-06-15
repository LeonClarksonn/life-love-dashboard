
import Sidebar from "@/components/layout/Sidebar";
import HabitManager from "@/components/habits/HabitManager";

const HabitsPage = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
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
