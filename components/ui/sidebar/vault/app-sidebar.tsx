import { Atom, ChevronUp, User2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../base/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../base/dropdown-menu';

const items = [
  { title: 'Home', url: '/', icon: Atom },
  { title: 'Dashboard', url: '/', icon: Atom },
  { title: 'Settings', url: '/', icon: Atom },
  { title: 'Profile', url: '/', icon: Atom },
  { title: 'Help', url: '/', icon: Atom },
];
/**
 * AppSidebar component is a composition of various Sidebar elements to create a complete sidebar layout.
 *
 * The sidebar is structured as follows:
 * - `Sidebar`: The main container for the sidebar.
 * - `SidebarHeader`: A sticky header section at the top of the sidebar.
 * - `SidebarContent`: A scrollable container for the main content of the sidebar.
 * - `SidebarGroup`: A section within the `SidebarContent` to group related items.
 * - `SidebarFooter`: A sticky footer section at the bottom of the sidebar.
 *
 * @returns A fully composed sidebar component with header, content, and footer sections.
 */
const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ? Header Start */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <Image src={'next.svg'} alt="logo" width={80} height={20} />
                <span>The Coding Vault</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* ? Header End */}
      <SidebarSeparator />
      {/* ? Content Start */}
      <SidebarContent>
        {/* ? Group 1 Start */}
        <SidebarGroup>
          <SidebarGroupLabel>HTML</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* ? Group 1 End */}
      </SidebarContent>
      {/* ? Content End */}
      <SidebarSeparator />
      {/* ? Footer Start */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {/* ? Footer End */}
    </Sidebar>
  );
};

export default AppSidebar;
