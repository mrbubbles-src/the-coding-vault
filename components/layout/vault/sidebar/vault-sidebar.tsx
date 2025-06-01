import Icon from '@/public/images/icon.svg';
import Logo from '@/public/images/sidebarlogo.svg';
import { ChevronDown, ChevronLeft, User2 } from 'lucide-react';
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
import { getCategories } from '@/lib/db';
import { ICategories } from '@/types/types';
import { getCurrentUser } from '@/lib/auth';
import { LogoutButton } from '@/components/ui/user-logout';
import VaultSidebarEntryLink from '@/components/layout/vault/sidebar/vault-sidebar-entry-link';

export const dynamic = 'force-static';
export const revalidate = 3600;

const VaultSidebar = async () => {
  const categories: Array<ICategories> = await getCategories();

  let loggedInUser = null;
  const result = await getCurrentUser();
  if ('error' in result) {
    loggedInUser = null;
  } else {
    loggedInUser = result.user;
  }

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ? Header Start */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size={'lg'}>
              <Link href={'/'} prefetch={false}>
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
        {/* ? Group Start */}
        {categories &&
          categories
            .filter(
              (category) =>
                category.vaultEntries && category.vaultEntries.length > 0,
            )
            .map((category) => (
              <Collapsible key={category.name} className="group/collapsible">
                <SidebarGroup>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={iconMap[category.iconKey]}
                      className="ml-[0.4rem] h-5 w-5 shrink-0"
                    />
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="group-data-[state=open]/collapsible:text-primary flex flex-1 cursor-pointer place-items-center items-center gap-2 text-lg font-semibold transition-colors">
                        <span className="text-lg font-semibold">
                          {category.name}
                        </span>
                        <aside className="flex items-center justify-end">
                          <SidebarMenuBadge className="text-sm">
                            (
                            {category?.vaultEntries?.filter(
                              (entry) => entry.published,
                            ).length || 0}
                            )
                            <ChevronLeft className="mr-2 ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:-rotate-z-90" />
                          </SidebarMenuBadge>
                        </aside>
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                  </div>
                  <CollapsibleContent className="group-data-[state=open]/collapsible:animate-collapsible-down animate-collapsible-up transition-all duration-300 ease-in-out">
                    <SidebarGroupContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem
                          className="flex flex-col gap-1.5"
                          key={category.name}>
                          {category.vaultEntries &&
                            category.vaultEntries.map(
                              (entry) =>
                                entry.published && (
                                  <VaultSidebarEntryLink
                                    key={entry.slug}
                                    slug={entry.slug}
                                    title={entry.title}
                                  />
                                ),
                            )}
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
        {/* ? Group End */}
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
                  <User2 /> {loggedInUser ? loggedInUser.username : 'Vaulty'}
                  <ChevronDown className="ml-auto transition-transform duration-500 ease-in-out group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  {loggedInUser ? (
                    <Link href={'/admin/dashboard'} prefetch={false}>
                      Admin Panel
                    </Link>
                  ) : (
                    <Link href={'/admin/login'} prefetch={false}>
                      Login
                    </Link>
                  )}
                </DropdownMenuItem>
                {loggedInUser ? (
                  <DropdownMenuItem variant="destructive">
                    <LogoutButton />
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {/* ? Footer End */}
    </Sidebar>
  );
};

export default VaultSidebar;
