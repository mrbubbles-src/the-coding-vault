import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';
import { socialIcons } from '@/lib/icon-map';
import { TSocialIcons } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface VaultAuthorSocialsProps {
  authorSocials: {
    website?: string;
    github?: string;
    linkedin?: string;
    codepen?: string;
    stackoverflow?: string;
    youtube?: string;
    twitter?: string;
    twitch?: string;
    discord?: string;
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
}

const VaultAuthorSocials = ({ authorSocials }: VaultAuthorSocialsProps) => {
  const preferredOrder: TSocialIcons[] = [
    'website',
    'github',
    'linkedin',
    'codepen',
    'stackoverflow',
    'youtube',
    'twitter',
    'twitch',
    'discord',
    'instagram',
    'tiktok',
    'facebook',
  ];
  return (
    <>
      {preferredOrder
        .filter((key) => authorSocials[key])
        .map((key) => {
          const value = authorSocials[key];
          const icon = socialIcons[key];

          if (!value || !icon) return null;

          return (
            <Tooltip key={key} delayDuration={400}>
              <TooltipTrigger>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary/80 cursor-pointer text-xl transition-all duration-300 ease-in-out"
                  aria-label={key}>
                  <FontAwesomeIcon icon={icon} className="p-2" />
                </a>
              </TooltipTrigger>
              <TooltipContent className="TooltipContent z-[1001] font-bold">
                {value}
              </TooltipContent>
            </Tooltip>
          );
        })}
    </>
  );
};

export default VaultAuthorSocials;
