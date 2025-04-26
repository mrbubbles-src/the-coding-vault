import { ChevronDown, ChevronUp, User2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '@/lib/icon-map';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/shadcn/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/shadcn/collapsible';
import { cn } from '@/lib/utils';

const items = [
  { title: 'Home', url: '/' },
  { title: 'Dashboard', url: '#' },
  { title: 'Settings', url: '#' },
  { title: 'Profile', url: '#' },
  { title: 'Help', url: '#' },
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
const AdminSidebar = () => {
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
        <Collapsible className="group/collapsible">
          {/* <SidebarMenuSkeleton />  ladezustand simulieren */}
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <FontAwesomeIcon icon={iconMap.html} />
                <SidebarMenuBadge>5</SidebarMenuBadge>
                HTML
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenuSub>
                  {items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton asChild isActive>
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
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
                <SidebarMenuButton className="group">
                  <User2 /> Admin{' '}
                  <ChevronUp className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
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

export default AdminSidebar;
