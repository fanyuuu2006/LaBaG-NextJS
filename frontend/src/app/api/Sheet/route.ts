import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process?.env?.BACKEND_URL ?? ""}/GetSheetData`
    );
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          message: `獲取失敗，回應狀態: ${
            response.status
          }，回應訊息: ${await response.text()}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json(
      { message: `伺服器錯誤，無法存取試算表: ${error}` },
      { status: 500 }
    );
  }
}
