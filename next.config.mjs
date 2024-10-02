/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.finncdn.no",
      },
    ],
  },
};

export default nextConfig;
