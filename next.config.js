/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "static.vecteezy.com",
      "previews.123rf.com",
      "encrypted-tbn0.gstatic.com",
      "c8.alamy.com",
    ],
  },
};

module.exports = nextConfig;
