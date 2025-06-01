'use client';
import VaultAuthorCard from '@/components/layout/vault/vault-author/vault-author-card';
import { useState } from 'react';
interface VaultAuthorProps {
  author:
    | {
        name?: string;
        email?: string;
        avatar?: string;
        authorSocials?: {
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
    | string;
}
const VaultAuthor = ({ author }: VaultAuthorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  if (typeof author === 'string') return <span>Author: {author}</span>;

  return (
    <section className="group relative inline-block w-full">
      <p className="text-md">
        <span>Author: </span>
        <span
          onClick={() => setIsOpen((prev) => !prev)}
          className={`cursor-pointer transition-all duration-300 ease-in-out ${
            isOpen ? 'text-primary font-bold' : ''
          } lg:group-hover:text-primary/80 lg:group-hover:font-bold`}>
          {author.name}
        </span>
      </p>

      <div className="pointer-events-none absolute top-full left-0 z-[1000] hidden opacity-0 transition-opacity duration-200 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 lg:block lg:group-hover:block">
        <VaultAuthorCard author={author} />
      </div>

      {/* Mobile Card unterhalb des gesamten Satzes */}
      {isOpen && (
        <div className="absolute top-full left-0 z-[1000] lg:hidden">
          <VaultAuthorCard author={author} />
        </div>
      )}
    </section>
  );
};

export default VaultAuthor;
