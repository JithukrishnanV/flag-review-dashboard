/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow embedding in iframes (Power BI Web Content visual)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
