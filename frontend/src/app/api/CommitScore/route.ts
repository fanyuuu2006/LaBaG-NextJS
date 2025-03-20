export type CommitScoreProps = {
  UserID: string | null;
  Name: string | null;
  Score: number;
  JsonData: Record<string, Record<string, number>>;
};

export const POST = async (req: Request): Promise<Response> => {
  if (!process?.env?.COMMITSCORE_URL || !process?.env?.API_SECRET_KEY) {
    return new Response(JSON.stringify({ message: "缺少必要的環境變數" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const data = await req.json();
    if (
      !data.UserID ||
      !data.Name ||
      typeof data.Score !== "number" ||
      !data.JsonData
    ) {
      return new Response(
        JSON.stringify({ message: "請求數據缺失或格式不正確" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(process?.env?.COMMITSCORE_URL ?? "", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process?.env?.API_SECRET_KEY as string,
      },
    });

    if (response.status === 204 || response.status === 200 || response.ok) {
      return new Response(JSON.stringify({ message: "CommitScore請求成功" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          message: `提交失敗，回應狀態: ${
            response.status
          }，回應訊息: ${response.text()}`,
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
