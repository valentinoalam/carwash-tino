import { withContentlayer } from 'next-contentlayer2'
import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})
const nextConfig: NextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test?: { test?: (str: string) => boolean } }) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but exclude SVG files from it
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /component/ }, // Excludes SVG imports with '?component' query
      },
      // Add a new rule to handle SVG imports as React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /component/, // Only handles SVG imports with '?component' query
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore SVG files
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // compiler: {
  //   styledComponents: true
  // },
  // reactStrictMode: true,
  // experimental: {
  // 		workerThreads: false,
  // 		cpus: 2 // Limit CPU usage
  // },
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/og/**',
      },
    ], 
    // Define device sizes for responsive images
    deviceSizes: [
      320,  //xs
      420,  //sm
      768,  //md
      1024, //lg
      1200  //xl
    ],
    // Define image sizes for optimization
    imageSizes: [
      16,   // tiny icons
      32,   // small icons
      48,   // medium icons
      64,   // large icons
      96,   // avatars
      128,  // thumbnails
      256,  // small images
      384   // medium images
    ],
    // All supported formats in order of preference
    formats: ['image/avif', 'image/webp'],
    // Disable static image imports (optional)
    disableStaticImages: false,
    // Minimum cache TTL in seconds
    minimumCacheTTL: 60,
    // Allow SVG - with security policy
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    // contentSecurityPolicy: "default-src 'self'; script-src 'self'; sandbox allow-scripts;",
  },
};
// export default nextConfig
export default withContentlayer(withMDX(nextConfig))