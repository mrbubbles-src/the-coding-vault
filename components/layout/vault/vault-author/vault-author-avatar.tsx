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
    <Avatar className="size-20">
      <AvatarImage
        src={avatarSrc}
        alt={authorName}
        className="object-cover object-center"
      />
      <AvatarFallback className="text-xs">{authorName}</AvatarFallback>
    </Avatar>
  );
};

export default VaultAuthorAvatar;
