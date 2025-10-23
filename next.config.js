/** @type {import('next').NextConfig} */
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
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'travelpally.com' }],
      destination: 'https://www.travelpally.com/:path*',
      permanent: true
    }
  ],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.html$/i,
      loader: "html-loader",
    });
    return config
  },
}

module.exports = nextConfig
