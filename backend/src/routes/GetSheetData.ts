import { Request, Response } from "express";
import { Sheet } from "../lib/Sheet";

export const GetSheetData = async (_: Request, res: Response) => {
  try {
    const UserResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "用戶資料!A:F",
    });

    const RecordResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:E",
    });

    const UserRows = UserResponse.data.values?.slice(1) as string[][];
    const RecordRows = RecordResponse.data.values?.slice(1) as string[][];

    if (UserRows && RecordRows) {
      return res.status(200).json({ UserRows, RecordRows });
    }
    return res.status(400).json({ message: `獲取試算表錯誤` });
  } catch (error: unknown) {
    return res.status(500).json({ message: `伺服器錯誤: ${error}` });
  }
};
