import Icon from '@/public/images/icon.svg';
import Logo from '@/public/images/sidebarlogo.svg';
import { ChevronDown, ChevronLeft, User2 } from 'lucide-react';
import { iconMap } from '@/lib/icon-map';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarIconTrigger,
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
import { ICategories } from '@/types/types';
import { getCurrentUser } from '@/lib/auth';
import { LogoutButton } from '@/components/ui/user-logout';
import VaultSidebarEntryLink from '@/components/layout/vault/sidebar/vault-sidebar-entry-link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';

const VaultSidebar = async ({
  categories,
}: {
  categories: Array<ICategories>;
}) => {
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
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <SidebarHeader className="py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size={'lg'}>
                  <Link href={'/'} prefetch={false} className="cursor-pointer">
                    <Image
                      src={Icon}
                      alt="vaulty-icon"
                      className="cursor-pointer"
                      width={45}
                      height={45}
                    />

                    <Image
                      src={Logo}
                      alt="the-coding-vault-logo"
                      className="cursor-pointer"
                      width={210}
                      height={45}
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="TooltipContent z-[1001] max-w-[20rem] font-bold text-pretty md:max-w-full">
          Zurück zur Startseite
        </TooltipContent>
      </Tooltip>
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
                    <SidebarIconTrigger
                      categoryName={category.name}
                      iconToUse={iconMap[category.iconKey]}
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
