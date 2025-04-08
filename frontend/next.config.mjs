// next.config.mjs
import withPWA from "next-pwa";

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // 允許 Google 頭像來源
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  ...nextConfig,
});
