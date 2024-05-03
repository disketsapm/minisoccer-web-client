/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false, // Disable React Strict Mode

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
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
