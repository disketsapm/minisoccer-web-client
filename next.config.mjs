/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "rafi-demo-bucket.s3.amazonaws.com",
      "www.eclosio.ong",
      "i0.wp.com",
      "images.sidearmdev.com",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all paths
        destination: process.env.NEXT_PUBLIC_API_URL + "/:path*", // Rewrite to the base URL
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
