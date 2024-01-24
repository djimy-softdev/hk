/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urhouse.s3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
