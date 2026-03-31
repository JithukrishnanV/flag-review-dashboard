/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Test-Header',
            value: 'headers-working'
          }
        ],
      },
    ];
  },
};

export default nextConfig;