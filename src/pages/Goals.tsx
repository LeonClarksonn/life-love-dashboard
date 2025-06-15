
import Sidebar from "@/components/layout/Sidebar";
import Goals from "@/components/goals/Goals";

const GoalsPage = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <Goals />
        </div>
      </main>
    </div>
  );
};

export default GoalsPage;
