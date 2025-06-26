import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          // {
          //   key: "Content-Range",
          //   value: "bytes: 0-9/*",
          // },
        ]
      }
    ]
  }
};

export default nextConfig;
