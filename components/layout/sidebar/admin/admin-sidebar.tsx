import Icon from '@/public/images/icon.svg';
import Logo from '@/public/images/sidebarlogo.svg';
import {
  ChevronDown,
  ChevronLeft,
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
import { getCurrentUser } from '@/lib/auth';
import {
  canDeleteEntry,
  canManageUsers,
  canSubmitEntry,
  canViewEntries,
} from '@/lib/roles';
import { Route } from 'next';

const AdminSidebar = async () => {
  const result = await getCurrentUser();
  if ('error' in result) return null;
  const loggedInUser = result.user;

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ? Header Start */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size={'lg'}>
              <Link href={'/admin/dashboard' as Route} prefetch={false}>
                <Image src={Icon} alt="vaulty-icon" width={45} height={45} />
                <Image
                  src={Logo}
                  alt="the-coding-vault-logo"
                  width={210}
                  height={45}
                />
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
              <Vault className="ml-[0.4rem] h-5 w-5 shrink-0" />
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group-data-[state=open]/collapsible:text-primary flex flex-1 cursor-pointer place-items-center items-center gap-2 text-lg font-semibold transition-colors">
                  <span className="text-lg font-semibold">Vault Entries</span>
                  <ChevronLeft className="mr-2 ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:-rotate-z-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
            </div>
            <CollapsibleContent className="group-data-[state=open]/collapsible:animate-collapsible-down animate-collapsible-up transition-all duration-500 ease-in-out">
              {loggedInUser && canViewEntries(loggedInUser.role) && (
                <>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton className="transition-all duration-200 ease-in-out group-data-[state=open]/collapsible:opacity-100">
                          <Link
                            href={'/admin/dashboard/entries/all' as Route}
                            prefetch={false}>
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
                          <Link
                            href={'/admin/dashboard/entries/published' as Route}
                            prefetch={false}>
                            <span>Published Entries</span>
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
                          <Link
                            href={
                              '/admin/dashboard/entries/unpublished' as Route
                            }
                            prefetch={false}>
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
                        <Link
                          href={'/admin/dashboard/entries/delete' as Route}
                          prefetch={false}>
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
                <NotebookPen className="ml-[0.4rem] h-5 w-5 shrink-0" />
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                    <span className="text-lg font-semibold">New Entries</span>
                    <ChevronLeft className="mr-2 ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:-rotate-z-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </div>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link
                          href={'/admin/dashboard/entries/submit' as Route}
                          prefetch={false}>
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
                <Users className="ml-[0.4rem] h-5 w-5 shrink-0" />
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                    <span className="text-lg font-semibold">
                      User Management
                    </span>
                    <ChevronLeft className="mr-2 ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:-rotate-z-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              </div>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>
                        <Link
                          href={'/admin/dashboard/users/all' as Route}
                          prefetch={false}>
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
                        <Link
                          href={'/admin/dashboard/users/create' as Route}
                          prefetch={false}>
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
                        <Link
                          href={'/admin/dashboard/users/delete' as Route}
                          prefetch={false}>
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
                  <ChevronDown className="ml-auto transition-transform duration-500 ease-in-out group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={'/'} prefetch={false}>
                    Vault
                  </Link>
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
