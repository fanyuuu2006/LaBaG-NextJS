/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config) {
    // 配置 Webpack 以處理音頻文件
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/i,
      use: {
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash].[ext]", // 設定輸出的檔名格式
        },
      },
    });

    return config;
  },
};

export default nextConfig;
