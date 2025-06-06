'use client';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/shadcn/sidebar';
import { LogoutButton } from '@/components/ui/user-logout';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/shadcn/dropdown-menu';
import { User2, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const VaultSidebarFooter = () => {
  const [loggedInUser, setLoggedInUser] = useState<{
    id: string;
    username: string;
    role: string;
  } | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched user data:', data);
        setLoggedInUser(data);
      }
    };
    fetchUser();
  }, []);
  console.log('Logged in user:', loggedInUser);

  if (!loggedInUser) return null;

  return (
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
                <Link href={'/admin/dashboard'} prefetch={false}>
                  Admin Panel
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
  );
};

export default VaultSidebarFooter;
