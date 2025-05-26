import { MDXRemote } from 'next-mdx-remote-client/rsc';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import ConvertEditorJsToMDX from '@/components/layout/vaultEditor/convert-editor-js-to-mdx';
import { Suspense } from 'react';
import { components } from '@/mdx-components';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getVaultEntryBySlug } from '@/lib/db';

export default async function VaultEntryPage({
  params,
}: {
  params: { slug: string };
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
