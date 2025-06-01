import { PlusCircleIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar';

const VaultAuthorAvatar = ({
  avatarSrc,
  authorName,
}: {
  avatarSrc: string;
  authorName: string;
}) => {
  return (
    <div className="relative w-fit">
      <Avatar className="size-20">
        <AvatarImage
          src={avatarSrc}
          alt={authorName}
          className="object-cover object-center"
        />
        <AvatarFallback className="text-xs">{authorName}</AvatarFallback>
      </Avatar>
      <button className="focus-visible:ring-ring/50 absolute -end-1 -bottom-1 inline-flex cursor-pointer items-center justify-center rounded-full focus-visible:ring-[3px] focus-visible:outline-none">
        <PlusCircleIcon className="text-background size-5 fill-slate-400" />
        <span className="sr-only">Add</span>
      </button>
    </div>
  );
};

export default VaultAuthorAvatar;
