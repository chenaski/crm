/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL,
  },
};

module.exports = nextConfig;
