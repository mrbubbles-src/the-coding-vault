import { Route } from 'next';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

const VaultLink = ({ href, children, ...props }: AnchorProps) => {
  const className =
    'text-primary hover:text-primary/80 inline-block cursor-pointer font-bold underline underline-offset-4 transition-all duration-300 ease-in-out active:scale-95';
  if (href?.startsWith('/')) {
    return (
      <Link href={href as Route} className={className} {...props}>
        {children}
      </Link>
    );
  }
  if (href?.startsWith('#')) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}>
      {children}
    </a>
  );
};

export default VaultLink;
