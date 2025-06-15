
import { useAuth } from "@/providers/AuthProvider";

const Greeting = () => {
  const { profile } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    }
    return "Good afternoon";
  };
  
  const name = profile?.first_name || 'there';

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800">{getGreeting()}, {name}!</h2>
      <p className="text-muted-foreground mt-1">Welcome to your personal dashboard. Let's make today productive.</p>
    </div>
  );
};

export default Greeting;
