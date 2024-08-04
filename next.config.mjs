/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require("http-proxy-middleware");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photo-resize-zmp3.zmdcdn.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zmp3-static.zmdcdn.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photo-zmp3.zmdcdn.me",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-zingmp3-vercel-sigma.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
