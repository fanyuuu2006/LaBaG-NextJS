import { Sheet } from "../config/googleapi";
import { authUser, signProfiles } from "../types/auth";

export const extractUserData = (user: signProfiles): authUser => ({
  id: user.id,
  name: user.displayName || "未知使用者",
  email: user.emails?.[0]?.value || "",
  image: user.photos?.[0]?.value || "",
});

export const findUser = async (
  user: authUser
): Promise<authUser | undefined> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/data/users/${user.id}`
    );

    if (response.ok) {
      return (await response.json()) as authUser;
    }

    if (response.status === 404) {
      return undefined; // 使用者不存在，正常返回 undefined
    }

    // 如果是其他錯誤，直接丟出錯誤代碼與訊息
    const errorMessage = await response.text();
    throw new Error(
      `查詢使用者時發生錯誤 (${response.status}): ${errorMessage}`
    );
  } catch (error) {
    console.error("查詢使用者失敗:", error);
    return undefined;
  }
};
export const createUser = async (
  user: authUser
): Promise<authUser | undefined> => {
  try {
    const { id, name, email, image } = user;
    if (!id ){throw new Error("缺少必要資料")}
    const response = await Sheet.spreadsheets.values.append({
      spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
      range: "用戶資料!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
            }),
            id,
            name,
            email,
            image,
          ],
        ],
      },
    });

    if (!response)
      throw new Error("Google Sheets API 回應為空，請檢查 API 設定。");

    console.log(`用戶資料創建成功: ${id}, ${name}, ${email}, ${image}`);
    return user;
  } catch (error) {
    console.error("創建使用者時發生錯誤:", error);
    return undefined;
  }
};
