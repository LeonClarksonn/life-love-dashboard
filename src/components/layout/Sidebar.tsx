
import { Home, ClipboardCheck, Target, Wallet, BrainCircuit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: ClipboardCheck, label: 'Tasks', href: '#' },
  { icon: Target, label: 'Goals', href: '#' },
  { icon: Wallet, label: 'Finances', href: '/finances' },
  { icon: BrainCircuit, label: 'Habits', href: '#' },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex-col hidden md:flex">
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
        <Button asChild variant="ghost" className="w-full justify-start text-base font-medium">
          <Link to="#">
            <Settings className="mr-4 h-5 w-5" />
            Settings
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
