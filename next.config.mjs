/** @type {import('next').NextConfig} */
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
        source: "/api/:path*", // Sử dụng :path* để khớp với các đường dẫn động
        destination: "https://api-zingmp3-vercel-sigma.vercel.app/api/:path*", // Đảm bảo URL đích khớp với cấu hình source
      },
    ];
  },
};

export default nextConfig;
