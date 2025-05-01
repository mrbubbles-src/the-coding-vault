import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';
import { Route } from 'next';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="mt-6 mb-4 text-4xl leading-tight text-pretty" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-4 mb-2 text-2xl leading-tight text-pretty" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-4 mb-2 text-lg leading-tight text-pretty" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-lg leading-relaxed" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="list-decimal space-y-2 pl-5" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 pl-5" {...props} />
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
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href as Route} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href as Route} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href as Route}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}>
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="text-muted-foreground dark:border-primary border-l-4 pl-5 italic"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
