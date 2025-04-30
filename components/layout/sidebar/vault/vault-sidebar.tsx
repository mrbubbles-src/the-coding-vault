import Icon from '@/public/images/icon.svg';
import Logo from '@/public/images/sidebarlogo.svg';
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
import { ICategories } from '@/lib/types';
import { headers } from 'next/headers';
import { getCookie } from '@/lib/cookies';
import { verifyJWT } from '@/lib/auth';
import { LogoutButton } from '@/components/ui/user-logout';

const VaultSidebar = async () => {
  const categories: Array<ICategories> = await getCategories();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  // const referer = headersList.get('referer') || '';
  // const pathname = referer ? new URL(referer).pathname : '';
  const token = await getCookie('token');
  let loggedInUser = null;

  if (token) {
    try {
      loggedInUser = await verifyJWT(token);
    } catch (error) {
      console.error('Token verification failed:', error);
    }
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
          categories.entries &&
          categories.entries.length === 0 &&
          categories.map((category) => (
            <Collapsible key={category.name} className="group/collapsible">
              <SidebarGroup>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={iconMap[category.iconKey]}
                    className="ml-[1.2rem] h-5 w-5 shrink-0"
                  />
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                      <span className="text-lg font-semibold">
                        {category.name}
                      </span>
                      <aside className="flex items-center justify-end">
                        <SidebarMenuBadge className="text-sm">
                          ({categories.entries.length})
                          <ChevronDown className="mr-2 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuBadge>
                      </aside>
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                </div>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem key={category.name}>
                        {category.entries &&
                          category.entries.map((entry) => (
                            <SidebarMenuButton
                              key={entry.slug}
                              asChild
                              isActive={pathname.startsWith(
                                `/vault/${entry.slug}`,
                              )}>
                              <Link
                                href={`/vault/${entry.slug}`}
                                prefetch={false}>
                                <span>{entry.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          ))}
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
                  <ChevronUp className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
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
