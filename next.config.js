// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline.html',
  },
  runtimeCaching: [
    // Cache static images & fonts
    {
      urlPattern: ({ request }) =>
        request.destination === 'image' || request.destination === 'font',
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30d
      },
    },

    //Cache API responses when offline (your choice)
    {
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 40,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // Cache pages (HTML documents)
    {
      urlPattern: ({ request }) => request.destination === 'document',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        networkTimeoutSeconds: 3,
      },
    },
  ],
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
    return config;
  },
};

module.exports = withPWA(nextConfig);
