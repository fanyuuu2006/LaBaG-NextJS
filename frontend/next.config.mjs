/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // 禁用 Turbopack，強制使用 Webpack
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // 允許 Google 頭像來源
  },
};

export default nextConfig;
