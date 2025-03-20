export type FormProps = {
  accessToken: string;
  UserID: string | null;
  Name: string | null;
  Score: number;
  JsonData: Record<string, Record<string, number>>;
};

export const POST = async (req: Request): Promise<Response> => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "未提供 accessToken" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const accessToken = authHeader.split(" ")[1]; // 取得 accessToken
  const googleUserInfoUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`;

  try {
    // 🔹 驗證 accessToken 是否有效
    const googleResponse = await fetch(googleUserInfoUrl);
    if (!googleResponse.ok) {
      return new Response(
        JSON.stringify({ message: "accessToken 無效或過期" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userInfo = await googleResponse.json();

    // 🔹 解析使用者資訊
    const googleUserID = userInfo.sub; // Google 的 User ID

    const { UserID, Name, Score, JsonData } = await req.json();

    if (!UserID || !Name || !Score) {
      return new Response(
        JSON.stringify({ message: "缺少UserID、Name 或 Score" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 🔹 確保提交的 UserID 符合 Google 驗證的 ID
    if (UserID !== googleUserID) {
      return new Response(JSON.stringify({ message: "UserID 不匹配" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = new URLSearchParams();
    formData.append("entry.1181479366", UserID);
    formData.append("entry.868955826", Name);
    formData.append("entry.413238880", String(Score));
    formData.append("entry.255424064", JSON.stringify(JsonData));

    const response = await fetch(process?.env?.GOOGLE_FORM_RECORD ?? "", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (response.status === 204 || response.ok) {
      return new Response(JSON.stringify({ message: "成功提交分數" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ message: `提交失敗，回應狀態: ${response.status}` }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `伺服器錯誤，無法提交分數: ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
