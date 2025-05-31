'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenuButton } from '@/components/ui/shadcn/sidebar';
import { Route } from 'next';

interface VaultSidebarEntryLinkProps {
  slug: string;
  title: string;
}

const VaultSidebarEntryLink = ({ slug, title }: VaultSidebarEntryLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.toLowerCase() === `/vault/${slug}`.toLowerCase();

  return (
    <SidebarMenuButton
      variant={'outline'}
      className={`opacity-0 transition-all duration-300 ease-in-out group-data-[state=open]/collapsible:opacity-100 ${isActive ? 'scale-105' : ''}`}
      asChild
      isActive={isActive}>
      <Link href={`/vault/${slug}` as Route} prefetch={false}>
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default VaultSidebarEntryLink;
