/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Allow avatar images from whatever URL you provide in env vars.
      // This is a portfolio app, so this trade-off is acceptable for flexibility.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;

