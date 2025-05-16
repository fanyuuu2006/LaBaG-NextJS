import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 分鐘
  max: 80,
  message: { message: "請求過於頻繁" },
  keyGenerator: (req) => req?.ip ?? "", // 使用來自每個請求的 req.ip（即客戶端的 IP 地址）來生成唯一的識別鍵 這樣系統就會對每個 IP 地址進行獨立的限流控制
});

export const recordsPostRateLimit = rateLimit({
  windowMs: 90 * 1000, // 1.5 分鐘
  max: 1,
  message: { message: "請求過於頻繁" },
  keyGenerator: (req) => req?.ip ?? "",
});
