/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
