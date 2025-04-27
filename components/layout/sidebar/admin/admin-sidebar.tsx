import {
  ChevronDown,
  ChevronUp,
  NotebookPen,
  User2,
  Users,
  Vault,
} from 'lucide-react';
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
import { LogoutButton } from '@/components/ui/user-logout';
import { getCookie } from '@/lib/cookies';
import { verifyJWT } from '@/lib/auth';
import {
  canDeleteEntry,
  canManageUsers,
  canSubmitEntry,
  canViewEntries,
} from '@/lib/roles';

const AdminSidebar = async () => {
  const token = await getCookie('token');
  if (!token) return null;
  const loggedInUser = await verifyJWT(token);
  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ? Header Start */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <Image src={'vercel.svg'} alt="logo" width={20} height={20} />
                <span>TCV Admin Dashboard</span>
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
          <SidebarGroup>
            <div className="flex items-center gap-2">
              <Vault className="h-5 w-5 shrink-0" />
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                  <span className="text-lg font-semibold">Vault Entries</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
            </div>
            <CollapsibleContent>
              {loggedInUser && canViewEntries(loggedInUser.role) && (
                <>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <Link href={`/`}>
                            <span>All Entries</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge className="text-sm">
                          (3)
                        </SidebarMenuBadge>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <Link href={`/`}>
                            <span>Publisehd Entries</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge className="text-sm">
                          (3)
                        </SidebarMenuBadge>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <Link href={`/`}>
                            <span>Unpublished Entries</span>
                          </Link>
                          <SidebarMenuBadge className="text-sm">
                            (3)
                          </SidebarMenuBadge>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </>
              )}
              {loggedInUser && canDeleteEntry(loggedInUser.role) && (
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link href={`/`}>
                          <span>Delete Entry</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
              )}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* ? Group 1 End */}
        {/* ? Group 2 Start */}
        {loggedInUser && canSubmitEntry(loggedInUser.role) && (
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <div className="flex items-center gap-2">
                <NotebookPen className="h-5 w-5 shrink-0" />
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                    <span className="text-lg font-semibold">New Entries</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </div>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link href={``}>
                          <span>Submit Entry</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
        {/* ? Group 2 End */}
        {/* ? Group 3 Start */}
        {loggedInUser && canManageUsers(loggedInUser.role) && (
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 shrink-0" />
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                    <span className="text-lg font-semibold">
                      User Management
                    </span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </div>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link href={``}>
                          <span>All Users</span>
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuBadge className="text-sm">
                        (3)
                      </SidebarMenuBadge>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link href={``}>
                          <span>Create New User</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link href={``}>
                          <span>Delete User</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
        {/* ? Group 3 End */}
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
                  <User2 /> {loggedInUser.username}
                  <ChevronUp className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={'/'}>Vault</Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogoutButton />
                </DropdownMenuItem>
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
