import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const POST = async (req: Request): Promise<Response> => {
  if (!process?.env?.BACKEND_URL) {
    return new Response(JSON.stringify({ message: "缺少必要的環境變數" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "未登入，禁止存取" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = await req.json();

    const response = await fetch(
      `${process?.env?.BACKEND_URL ?? ""}/CommitScore`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 204 || response.status === 200 || response.ok) {
      return new Response(JSON.stringify({ message: "BACKEND請求成功" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          message: `提交失敗，回應狀態: ${
            response.status
          }，回應訊息: ${await response.text()}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `伺服器錯誤，無法提交分數: ${error}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
