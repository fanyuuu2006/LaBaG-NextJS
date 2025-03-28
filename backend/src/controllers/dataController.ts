import { Request, Response } from "express";
import { Sheet } from "../config/googleapi";
import { authUser } from "../types/auth";

export const getRecords = async (_: Request, res: Response) => {
  try {
    const RecordResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:D",
    });

    const RecordRows = RecordResponse.data.values?.slice(1) as string[][];

    if (RecordRows) {
      res.status(200).json(RecordRows);
      return;
    }
    console.log("獲取試算表錯誤");
    res.status(400).json({ message: "獲取試算表錯誤" });
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
    const UserResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "用戶資料!A:E",
    });

    const UserRows = UserResponse.data.values?.slice(1) as string[][];

    if (UserRows) {
      res.status(200).json(UserRows);
      return;
    }
    res.status(400).json({ message: `獲取試算表錯誤` });
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
    const { id, name, email, image } = req.body as authUser;
    await Sheet.spreadsheets.values.append({
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
    console.log("用戶資料添加成功: ", id, name, email, image);
    res.status(200).json({ message: "添加用戶成功" });
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法添加用戶: ${
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
