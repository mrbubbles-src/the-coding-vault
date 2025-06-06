'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarMenuButton } from '@/components/ui/shadcn/sidebar';
import { Route } from 'next';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';

interface VaultSidebarEntryLinkProps {
  slug: string;
  title: string;
}

const VaultSidebarEntryLink = ({ slug, title }: VaultSidebarEntryLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.toLowerCase() === `/vault/${slug}`.toLowerCase();

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <SidebarMenuButton
          variant={'outline'}
          className={`opacity-0 transition-all duration-300 ease-in-out group-data-[state=open]/collapsible:opacity-100 ${isActive ? 'scale-105' : ''}`}
          asChild
          isActive={isActive}>
          <Link href={`/vault/${slug}` as Route} prefetch={false}>
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="TooltipContent z-[1001] max-w-[20rem] font-bold text-pretty md:max-w-full">
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export default VaultSidebarEntryLink;
