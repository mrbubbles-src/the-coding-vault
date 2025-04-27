import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  serverExternalPackages: ['@prisma/client'],
  experimental: {
    useCache: true,
  },
};
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});
export default withMDX(nextConfig);

// export default nextConfig;
