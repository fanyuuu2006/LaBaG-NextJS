import { NextResponse } from "next/server";
import { Sheet } from "@/lib/Sheet";

export async function GET() {
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

    return NextResponse.json({ UserRows, RecordRows });
  } catch (error) {
    return NextResponse.json(
      { message: `伺服器錯誤，無法存取試算表: ${error}` },
      { status: 500 }
    );
  }
}
