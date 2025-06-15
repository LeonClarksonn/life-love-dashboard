
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";

const Greeting = () => {
  const { profile, loading } = useAuth();
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    }
    return "Good afternoon";
  };
  
  const name = profile?.first_name || 'there';
  const fullGreeting = `${getGreeting()}, ${name}!`;

  useEffect(() => {
    if (loading || !fullGreeting) return;

    setIsTyping(true);
    setDisplayedGreeting("");

    let typingInterval: ReturnType<typeof setInterval>;
    const typingTimeout = setTimeout(() => {
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < fullGreeting.length) {
          setDisplayedGreeting(fullGreeting.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 70);
    }, 300);

    return () => {
      clearTimeout(typingTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [fullGreeting, loading]);


  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 min-h-[44px]">
        {displayedGreeting}
        {isTyping && <span className="animate-blink border-r-2 border-gray-800 ml-1"></span>}
      </h2>
      <p className="text-muted-foreground mt-1">Welcome to your personal dashboard. Let's make today productive.</p>
    </div>
  );
};

export default Greeting;
