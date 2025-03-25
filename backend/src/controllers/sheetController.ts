import { Request, Response } from "express";
import { Sheet } from "../config/googleapi";



export const getRecords = async (_: Request, res: Response) => {
  try {
    const RecordResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:E",
    });

    const RecordRows = RecordResponse.data.values?.slice(1) as string[][];

    if (RecordRows) {
      res.status(200).json(RecordRows);
      return;
    }
    res.status(400).json({ message: `獲取試算表錯誤` });
    return;
  } catch (error: unknown) {
    res.status(500).json({ message: `伺服器錯誤: ${error}` });
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
    res.status(500).json({ message: `伺服器錯誤: ${error}` });
    return;
  }
};
