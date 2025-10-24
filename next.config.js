// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline.html',
  },
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/i,
      loader: "html-loader",
    });
    return config
  },
};

// IMPORTANT — wrap export with withPWA
module.exports = withPWA(nextConfig);