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
import { getCategories } from '@/lib/db';
import { ICategories } from '@/lib/types';

const VaultSidebar = async () => {
  const categories: Array<ICategories> = await getCategories();

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
        {/* ? Group Start */}
        {/* {categories &&
          categories.entries &&
          categories.entries.length > 0 && */}
        {categories &&
          categories.map((category) => (
            <Collapsible key={category.name} className="group/collapsible">
              {/* <SidebarMenuSkeleton />  ladezustand simulieren */}
              <SidebarGroup>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={iconMap[category.iconKey]}
                    className="h-5 w-5 shrink-0"
                  />
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex flex-1 items-center gap-2">
                      <span className="text-lg font-semibold">
                        {category.name}
                      </span>
                      {/* <aside className="flex justify-around"> */}
                      <SidebarMenuBadge className="text-[1.2rem]">
                        55
                      </SidebarMenuBadge>
                      <ChevronDown className="mr-2 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      {/* </aside> */}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                </div>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem key={category.name}>
                        <SidebarMenuButton asChild isActive>
                          <Link href={`/vault/${category.slug}`}>
                            <span>{category.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
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

export default VaultSidebar;
