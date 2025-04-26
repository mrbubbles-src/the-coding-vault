import { SidebarTrigger } from '../shadcn/sidebar';
import { ThemeToggle } from '../shadcn/theme-toggle';

const Navbar = () => {
  return (
    <nav className="bg-sidebar flex w-full items-center justify-between rounded-md px-2 py-4">
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
