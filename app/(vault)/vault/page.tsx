import { MDXRemote } from 'next-mdx-remote-client/rsc';
import type { MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import preview from '@/data/editor-preview.json';
import ConvertEditorJsToMDX from '@/components/layout/vaultEditor/convert-editor-js-to-mdx';
import { Suspense } from 'react';
import { components } from '@/mdx-components';
import remarkGfm from 'remark-gfm';

export default async function Page() {
  const mdx = ConvertEditorJsToMDX({ blocks: preview.blocks });
  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  };

  return (
    <Suspense fallback={'loading'}>
      <MDXRemote source={mdx} options={options} components={components} />
    </Suspense>
  );
}
