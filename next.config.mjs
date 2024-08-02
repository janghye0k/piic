/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: './cache-handler.mjs',
  cacheMaxMemorySize: 0,
};

export default nextConfig;
