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
    ],
  },
};

export default nextConfig;
