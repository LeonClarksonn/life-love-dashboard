
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState, useMemo } from "react";

const greetings = [
  { lang: 'English', morning: 'Good morning', afternoon: 'Good afternoon' },
  { lang: 'Spanish', morning: 'Buenos días', afternoon: 'Buenas tardes' },
  { lang: 'French', morning: 'Bonjour', afternoon: 'Bon après-midi' },
  { lang: 'German', morning: 'Guten Morgen', afternoon: 'Guten Tag' },
  { lang: 'Italian', morning: 'Buongiorno', afternoon: 'Buon pomeriggio' },
  { lang: 'Portuguese', morning: 'Bom dia', afternoon: 'Boa tarde' },
  { lang: 'Japanese', morning: 'おはようございます', afternoon: 'こんにちは' },
  { lang: 'Mandarin', morning: '早上好', afternoon: '下午好' },
  { lang: 'Russian', morning: 'Доброе утро', afternoon: 'Добрый день' },
];

const Greeting = () => {
  const { profile, loading } = useAuth();
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const randomGreeting = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return randomGreeting.morning;
    }
    return randomGreeting.afternoon;
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
