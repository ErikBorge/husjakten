/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: !(process.env.NODE_ENV === "development"),
};

export default nextConfig;
