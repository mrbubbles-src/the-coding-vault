import { MDXRemote } from 'next-mdx-remote-client/rsc';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import ConvertEditorJsToMDX from '@/components/layout/vaultEditor/convert-editor-js-to-mdx';
import { Suspense } from 'react';
import { components } from '@/mdx-components';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getVaultEntryBySlug } from '@/lib/db';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // unecessary await here, but it removes an annoying (and unnecessary)
  // next.js warning about params needing to be awaited.
  const { slug } = await params;
  const entry = await getVaultEntryBySlug(slug);

  if (!entry) {
    return {
      title: 'Nicht gefunden | Vault',
      description: 'Dieser Eintrag existiert nicht.',
    };
  }

  return {
    title: `${entry.title} | Vault`,
    description:
      // entry.content?.blocks?.[0]?.data?.text?.slice(0, 160) ||
      'Ein Beitrag im Coding Vault.',
    openGraph: {
      title: `${entry.title} | Vault`,
      // description: entry.content?.blocks?.[0]?.data?.text?.slice(0, 160),
    },
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
  if (!entry) {
    return notFound();
  }
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
        <MDXRemote source={mdx} options={options} components={components} />
      </Suspense>
    </section>
  );
}
