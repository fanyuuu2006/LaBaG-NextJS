const extractDomain = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname; // 這裡會返回網域名（不包括協議和端口）
};
