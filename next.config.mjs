/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all paths
        destination: process.env.NEXT_PUBLIC_API_URL + "/:path*" // Rewrite to the base URL
      }
    ];
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
