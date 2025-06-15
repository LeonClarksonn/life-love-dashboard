
import AddHabitForm from "./AddHabitForm";
import HabitList from "./HabitList";

const HabitManager = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <AddHabitForm />
      </div>
      <div className="md:col-span-2">
        <HabitList />
      </div>
    </div>
  );
};

export default HabitManager;
