import { Sheet } from "../config/googleapi";
import {
  authUser,
  dataUserIndex,
  signProfiles,
} from "../types/user";

export const extractUserData = (user: signProfiles): authUser => ({
  id: user.id,
  name: user.displayName || "未知使用者",
  email: user.emails?.[0]?.value || "",
  image: user.photos?.[0]?.value || "",
});

export const updateUserField = <K extends keyof Omit<authUser, "id">>(
  user: authUser,
  { field, value }: { field: K; value: authUser[K] }
): authUser => ({
  ...user,
  [field]: value,
});

export const parseUser = (
  row: string[],
  omitColumns: (keyof Omit<authUser, "id">)[] = [] // 指定要排除的欄位
): authUser => {
  if (row.length <= dataUserIndex.id) {
    throw new Error("資料列格式錯誤，缺少必要欄位");
  }
  const user: authUser = { id: row[dataUserIndex.id] };

  if (!omitColumns.includes("name")) user.name = row[dataUserIndex.name];
  if (!omitColumns.includes("email")) user.email = row[dataUserIndex.email];
  if (!omitColumns.includes("image")) user.image = row[dataUserIndex.image];

  return user;
};

export const getUsers = async (): Promise<authUser[]> => {
  const userResponse = await Sheet.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
    range: "用戶資料!A:E",
  });
  const userRows = userResponse.data.values?.slice(1) as string[][];
  if (!userRows) {
    throw new Error("獲取用戶資料失敗");
  }
  return userRows.map((row) => parseUser(row));
};

export const findUser = async (
  id: authUser["id"]
): Promise<{ user?: authUser; dataIndex?: number }> => {
  try {
    const users = await getUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return {};

    return { user: users[index], dataIndex: index + 2 };
  } catch (error) {
    console.error("查詢使用者失敗:", error);
    return {};
  }
};

export const createUser = async (
  user: authUser
): Promise<authUser | undefined> => {
  try {
    const { id, name, email, image } = user;
    if (!id) {
      throw new Error("缺少必要資料");
    }
    const response = await Sheet.spreadsheets.values.append({
      spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
      range: `用戶資料!A:E`,
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

export const updateUser = async (
  user: authUser
): Promise<authUser | undefined> => {
  try {
    const { id, name, email, image } = user;

    if (!id) {
      throw new Error("缺少必要資料");
    }

    const { dataIndex } = await findUser(id);
    if (!dataIndex) throw new Error(`找不到 ID 為 ${id} 的使用者`);

    const updateResponse = await Sheet.spreadsheets.values.update({
      spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
      range: `用戶資料!B${dataIndex}:E${dataIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[id, name || "", email || "", image || ""]],
      },
    });

    if (!updateResponse) {
      throw new Error("Google Sheets API 回應為空，請檢查 API 設定。");
    }

    console.log(`用戶資料更新成功: ${id}`);
    return user;
  } catch (error) {
    console.error("更新使用者時發生錯誤:", error);
    return undefined;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const { dataIndex } = await findUser(id);
    if (!dataIndex) throw new Error(`找不到 ID 為 ${id} 的使用者`);

    const deleteResponse = await Sheet.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: `用戶資料!A${dataIndex}:E${dataIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [["(已刪除)", "", "", "", ""]],
      },
    });

    if (!deleteResponse)
      throw new Error("Google Sheets API 回應為空，請檢查 API 設定。");

    console.log(`用戶資料標記刪除成功: ${id}`);
    return true;
  } catch (error) {
    console.error("刪除使用者時發生錯誤:", error);
    return false;
  }
};

export const userDataCondition: Record<
  keyof Omit<authUser, "id">,
  {
    description: string;
    checkFunc: (args: { [key: string]: unknown }) => boolean;
  }[]
> = {
  name: [
    {
      description: "使用者名稱不能為空",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        return name.trim() !== "";
      },
    },
    {
      description: "使用者名稱必須為 1 到 10 個字元",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        const length = name.length;
        return length > 0 && length <= 10;
      },
    },
    {
      description: "使用者名稱不能包含空格",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        return !/\s/.test(name);
      },
    },
  ],
  email: [],
  image: [],
};
