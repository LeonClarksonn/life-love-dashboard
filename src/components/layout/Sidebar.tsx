
import { Home, ClipboardCheck, Target, Wallet, BrainCircuit, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: ClipboardCheck, label: 'Tasks', href: '/tasks' },
  { icon: Target, label: 'Goals', href: '/goals' },
  { icon: Wallet, label: 'Finances', href: '/finances' },
  { icon: BrainCircuit, label: 'Habits', href: '/habits' },
];

const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { pathname } = useLocation();
  const { signOut, session } = useAuth();

  return (
    <aside className={cn("w-64 bg-card border-r border-border p-6 flex-col", isMobile ? "flex h-full" : "hidden md:flex")}>
      <h1 className="font-serif text-2xl font-bold text-primary mb-12">Life Dashboard</h1>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Button asChild variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start text-base font-medium mb-2">
                <Link to={item.href}>
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {session ? (
          <>
            <Button asChild variant="ghost" className="w-full justify-start text-base font-medium mb-2">
              <Link to="#">
                <Settings className="mr-4 h-5 w-5" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base font-medium" onClick={signOut}>
              <LogOut className="mr-4 h-5 w-5" />
              Logout
            </Button>
          </>
        ) : (
          <Button asChild variant="ghost" className="w-full justify-start text-base font-medium">
            <Link to="/auth">
              <LogOut className="mr-4 h-5 w-5" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
