import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public", // Service Worker 輸出目錄
  register: true, // 自動註冊 Service Worker
  skipWaiting: true, // 跳過等待階段
  runtimeCaching: [], // 可添加緩存策略
});

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

export default withPWA(nextConfig);
