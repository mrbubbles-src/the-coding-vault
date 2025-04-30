import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
// import remarkGfm from 'remark-gfm';

// /** @type {import('next').NextConfig} */
// const nextConfig = {

const nextConfig: NextConfig = {
  /* config options here */
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    typedRoutes: true,
    useCache: true,
    mdxRs: {
      mdxType: 'gfm',
    },
  },
};

// /** @type {import('remark-gfm').Options} */
// const remarkGfmOptions = {
//   singleTilde: false,
// };
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  // options: {
  //   remarkPlugins: [[remarkGfm, remarkGfmOptions]],
  //   rehypePlugins: [],
  // },
});
export default withMDX(nextConfig);

// export default nextConfig;
