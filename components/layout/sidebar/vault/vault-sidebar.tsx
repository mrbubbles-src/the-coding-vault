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

const VaultSidebar = async () => {
  const categories: Array<ICategories> = await getCategories();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  // const referer = headersList.get('referer') || '';
  // const pathname = referer ? new URL(referer).pathname : '';

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* ? Header Start */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <Image src={'vercel.svg'} alt="logo" width={20} height={20} />
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
        {/* ? Group Start */}
        {categories &&
          categories.entries &&
          categories.entries.length > 0 &&
          categories.map((category) => (
            <Collapsible key={category.name} className="group/collapsible">
              <SidebarGroup>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={iconMap[category.iconKey]}
                    className="ml-[0.400rem] h-5 w-5 shrink-0"
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
                              <Link href={`/vault/${entry.slug}`}>
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

export default VaultSidebar;
