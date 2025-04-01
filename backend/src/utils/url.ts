export const extractDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname; // 返回純網域，如 "labag.vercel.app"
  } catch (error) {
    console.error("❌ 無法解析 URL:", url, error);
    return "";
  }
};
