import { MDXRemote } from 'next-mdx-remote-client/rsc';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import ConvertEditorJsToMDX from '@/components/layout/vault-editor/convert-editor-js-to-mdx';
import { Suspense } from 'react';
import { components } from '@/mdx-components';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getVaultEntryBySlug } from '@/lib/db';
import VaultAuthor from '@/components/layout/vault/vault-author/vault-author';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unecessary await here, but it removes an annoying (and unnecessary)
  // next.js warning about params needing to be awaited.
  const { slug } = await params;
  const entry = await getVaultEntryBySlug(slug);

  if (!entry || !entry.published) {
    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
      ),
      title: 'Eintrag Nicht gefunden | The Coding Vault',
      description: 'Dieser Eintrag existiert nicht in The Coding Vault.',
      openGraph: {
        title: `Eintrag Nicht gefunden | The Coding Vault`,
        description: 'Dieser Eintrag existiert nicht in The Coding Vault.',
        images: [
          {
            url: 'https://thecodingvault.mrbubbles-src.dev/api/og',
            width: 1200,
            height: 630,
            alt: 'The Coding Vault Logo',
          },
        ],
        type: 'website',
        locale: 'de_DE',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Eintrag Nicht gefunden | The Coding Vault',
        description: 'Dieser Eintrag existiert nicht in The Coding Vault.',
        images: ['https://thecodingvault.mrbubbles-src.dev/api/og'],
        creator: '@_MstrBubbles',
      },
      other: {
        'apple-mobile-web-app-title': 'thecodingvault.mrbubbles-src.dev',
      },
    };
  }

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    ),
    title: `${entry.title} | The Coding Vault`,
    description: entry.description || 'Ein Beitrag in The Coding Vault.',
    openGraph: {
      title: `${entry.title} | The Coding Vault`,
      description: entry.description || 'Ein Beitrag in The Coding Vault.',
      images: [
        {
          url: 'https://thecodingvault.mrbubbles-src.dev/api/og',
          width: 1200,
          height: 630,
          alt: 'The Coding Vault Logo',
        },
      ],
      type: 'website',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description || 'Ein Beitrag in "The Coding Vault".',
      images: ['https://thecodingvault.mrbubbles-src.dev/api/og'],
      creator: '@_MstrBubbles',
    },
    other: { 'apple-mobile-web-app-title': 'thecodingvault.mrbubbles-src.dev' },
  };
}

export default async function VaultEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unecessary await here, but it removes an annoying (and unnecessary)
  // next.js warning about params needing to be awaited.
  const { slug } = await params;
  const entry = await getVaultEntryBySlug(slug);
  if (!entry || !entry.published) {
    return notFound();
  }
  console.log('Vault Entry:', entry);
  const mdx = ConvertEditorJsToMDX({ blocks: entry.content.blocks });
  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  };

  return (
    <section className="container flex flex-col gap-4 p-2 text-pretty">
      <Suspense fallback={'loading'}>
        <VaultAuthor author={entry.author} />
        <MDXRemote source={mdx} options={options} components={components} />
      </Suspense>
    </section>
  );
}
