/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors https://app.powerbi.com https://*.powerbi.com http://localhost:3000;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;