import { Request, Response } from "express";
import { Sheet } from "../config/googleapi";
import { authUser } from "../types/auth";
import { gameRecord } from "../types/record";
import { createUser } from "../utils/user";

export const getRecords = async (_: Request, res: Response) => {
  try {
    const recordResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:D",
    });

    const recordRows = recordResponse.data.values?.slice(1) as string[][];
    if (!recordRows) {
      console.log("獲取試算表錯誤");
      res.status(400).json({ message: "獲取試算表錯誤" });
      return;
    }

    const recordDatas: gameRecord[] = recordRows.map((row) => ({
      time: row[0],
      id: row[1],
      name: row[2],
      score: parseInt(row[3]),
    }));

    res.status(200).json(recordDatas);
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法獲取資料: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const userResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "用戶資料!A:E",
    });
    const userRows = userResponse.data.values?.slice(1) as string[][];
    if (!userRows) {
      console.log("獲取試算表錯誤");
      res.status(400).json({ message: "獲取試算表錯誤" });
      return;
    }

    const userDatas: authUser[] = userRows.map((row) => ({
      id: row[1],
      name: row[2],
      email: row[3],
      image: row[4],
    }));

    res.status(200).json(userDatas);
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法獲取資料: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = req.body as authUser;

    // 確保 createUser 執行成功
    const newUser = await createUser(user);
    if (!newUser) {
      res.status(500).json({ message: "❌ 無法添加用戶" });
      return;
    }

    res.status(201).json({ message: "✅ 添加用戶成功", user: newUser });
    return;
  } catch (error) {
    console.error("❌ 伺服器錯誤:", error);
    res.status(500).json({
      message: `❌ 伺服器錯誤，無法添加用戶: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const addRecord = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.user as authUser;
    const { score, jsonData } = req.body;
    if (
      !id ||
      !name ||
      !score ||
      !jsonData ||
      typeof score !== "number" ||
      typeof jsonData !== "object"
    ) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    await Sheet.spreadsheets.values.append({
      spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            new Date().toLocaleString("zh-TW", {
              timeZone: "Asia/Taipei",
            }),
            id,
            name,
            score,
            JSON.stringify(jsonData),
          ],
        ],
      },
    });
    console.log("用戶資料添加成功: ", id, name, score, jsonData);
    res.status(200).json({ message: "添加提交分數" });
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法提交分數: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as authUser["id"];
    if (!userId) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    const response = await fetch(`${process.env.BACKEND_URL}/data/users`);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const userRows = (await response.json()) as authUser[];

    const user = userRows.find((user) => user.id === userId);

    if (!user) {
      console.log("查詢不到該用戶資料");
      res.status(404).json({ message: "查詢不到該用戶資料" });
      return;
    }

    res.status(200).json(user);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getRecordsById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as authUser["id"];
    if (!userId) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    const response = await fetch(`${process.env.BACKEND_URL}/data/records`);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const recordDatass = (await response.json()) as gameRecord[];

    const userRecords =
      recordDatass.filter((record) => record.id === userId) ?? [];

    res.status(200).json(userRecords);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getRanking = async (_: Request, res: Response) => {
  try {
    const recordsResponse = await fetch(
      `${process.env.BACKEND_URL}/data/records`
    );
    if (!recordsResponse.ok) {
      console.log("獲取紀錄資料失敗");
      throw new Error(await recordsResponse.json());
    }

    const recordDatas = (await recordsResponse.json()) as gameRecord[];
    const recordMap = new Map<authUser["id"], gameRecord>();

    recordDatas.forEach((record) => {
      const { id, score } = record;

      if (!recordMap.has(id) || score > (recordMap.get(id)?.score ?? 0)) {
        recordMap.set(id, record);
      }
    });
    const sortedData = Array.from(recordMap.values())
      .sort((a, b) => b.score - a.score)
      .map((value, index) => ({
        rank: index + 1,
        ...value,
      }));

    console.log(sortedData);
    console.log("成功獲取排行榜數據");
    res.status(200).json(sortedData);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
