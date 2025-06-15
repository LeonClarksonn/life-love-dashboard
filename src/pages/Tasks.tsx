
import Sidebar from "@/components/layout/Sidebar";
import Tasks from "@/components/dashboard/Tasks";

const TasksPage = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <Tasks title="Manage Your Tasks" />
        </div>
      </main>
    </div>
  );
};

export default TasksPage;
