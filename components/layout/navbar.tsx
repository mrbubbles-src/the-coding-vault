import { SidebarTrigger } from '@/components/ui/shadcn/sidebar';
import { ThemeToggle } from '@/components/ui/shadcn/theme-toggle';

const Navbar = () => {
  return (
    <nav className="bg-sidebar border-sidebar-border flex w-full items-center justify-between rounded-md border-b-2 px-2 py-4">
      <aside className="flex items-center space-x-4">
        <SidebarTrigger />
      </aside>
      <aside className="flex items-center space-x-4">
        <ThemeToggle />
      </aside>
    </nav>
  );
};

export default Navbar;
