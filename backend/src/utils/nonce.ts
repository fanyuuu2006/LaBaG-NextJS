import { v4 as uuidv4 } from "uuid";
import { authUser } from "../types/auth";
import { generateToken, verifyToken } from "./jwt";

const nonceStorage = new Map<string, number>(); // Nonce 存儲，值為過期時間
const CLEANUP_INTERVAL = 60 * 1000; // 每 60 秒清理一次過期的 Nonce

// 定期清理過期的 Nonce
setInterval(() => {
  const now = Date.now();
  for (const [nonce, expiresAt] of nonceStorage.entries()) {
    if (expiresAt < now) {
      nonceStorage.delete(nonce);
    }
  }
}, CLEANUP_INTERVAL);

/**
 * 產生 Nonce 並簽署 JWT
 * @param id 用戶 ID
 * @param expiryTime Nonce 有效時間（預設 5 分鐘）
 * @returns 簽名後的 JWT Token
 */
export const generateNonce = (
  id: authUser["id"],
  expiryTime: number = 5 * 60 * 1000
) => {
  const nonce = uuidv4();
  const expiresAt = Date.now() + expiryTime;
  nonceStorage.set(nonce, expiresAt);

  // 產生 JWT，內含 nonce
  return generateToken({ id, nonce }, "1m");
};

/**
 * 驗證 Nonce
 * @param token 用戶提交的 JWT
 * @param id 用戶 ID
 * @returns 是否驗證成功
 */
export const verifyNonce = (token: string, id: string): boolean => {
  try {
    const decoded = verifyToken(token);

    // 檢查 Token 是否屬於該用戶
    if (decoded.id !== id) return false;

    // 確保 Nonce 沒有被用過，且未過期
    const expiresAt = nonceStorage.get(decoded.nonce);
    if (!expiresAt || expiresAt < Date.now()) return false;

    // 使用後刪除 Nonce
    nonceStorage.delete(decoded.nonce);
    return true;
  } catch (_) {
    return false; // 驗證失敗
  }
};
