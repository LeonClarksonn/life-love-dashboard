
import { Home, ClipboardCheck, Target, Wallet, BrainCircuit, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '#' },
  { icon: ClipboardCheck, label: 'Tasks', href: '#' },
  { icon: Target, label: 'Goals', href: '#' },
  { icon: Wallet, label: 'Finances', href: '#' },
  { icon: BrainCircuit, label: 'Habits', href: '#' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex-col hidden md:flex">
      <h1 className="font-serif text-2xl font-bold text-primary mb-12">Life Dashboard</h1>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary mb-2">
                <item.icon className="mr-4 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
          <Settings className="mr-4 h-5 w-5" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
