import React, { ComponentPropsWithoutRef } from 'react';
// import { highlight } from 'sugar-high';
import Alerts from './components/layout/vault/alerts';
import DetailsToggle from './components/layout/vault/details-toggle';
import Embed from './components/layout/vault/embed';
import VaultImage from './components/layout/vault/vault-image';
import VaultLink from './components/layout/vault/vault-link';
import { VaultChecklist } from './components/layout/vault/vault-checklist';
import VaultCodeBlock from './components/layout/vault/vault-codeblock';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type DividerProps = ComponentPropsWithoutRef<'hr'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-4xl leading-tight text-pretty" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-2xl leading-tight text-pretty" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-xl leading-tight text-pretty" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-lg leading-relaxed" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal space-y-1 pl-5 [&_ol]:list-[lower-alpha] [&_ol_ol]:list-[lower-roman] [&_ol_ol_ol]:list-[lower-greek] [&_ul]:list-[circle] [&_ul_ul]:list-[disc] [&_ul_ul_ul]:list-[square]"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-[disc] space-y-1 pl-5 [&_ol]:list-[lower-alpha] [&_ol_ol]:list-[lower-roman] [&_ol_ol_ol]:list-[lower-greek] [&_ul]:list-[circle] [&_ul_ul]:list-[disc] [&_ul_ul_ul]:list-[square]"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className="pl-1 text-lg leading-snug" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold" {...props} />
  ),
  hr: (props: DividerProps) => (
    <hr className="border-muted m-4 border-2" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    return (
      <VaultLink href={href as string} {...props}>
        {children}
      </VaultLink>
    );
  },
  VaultCodeBlock: VaultCodeBlock,

  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <table
      className="[&_th]:bg-sidebar [&_tr:nth-child(even)]:bg-sidebar/80 w-full place-self-center text-sm lg:w-[58.95rem] lg:text-lg [&_td]:border-b [&_td]:px-4 [&_td]:py-2 [&_th]:border-b [&_th]:px-4 [&_th]:py-2 [&_tr]:text-center"
      {...props}
    />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="text-muted-foreground dark:border-primary my-4 border-l-4 pl-5 italic"
      {...props}
    />
  ),
  Alert: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'success' | 'warning' | 'danger';
    children: React.ReactNode;
  }) => <Alerts type={type}>{children}</Alerts>,
  DetailsToggle: ({
    text,
    children,
  }: {
    text: string;
    children: React.ReactNode;
  }) => <DetailsToggle text={text}>{children}</DetailsToggle>,
  Embed: (props: { embed: string; caption?: string }) => <Embed {...props} />,
  VaultImage: (props: {
    url: string;
    caption: string;
    original_filename: string;
    public_id: string;
    width: number;
    height: number;
  }) => <VaultImage {...props} />,
  VaultLink: VaultLink,
  VaultChecklist: VaultChecklist,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
export { components };
