export type FormProps = {
  UserID: string | null;
  Name: string | null;
  Score: number;
  JsonData: Record<string, Record<string, number>>;
};

export const POST = async (req: Request): Promise<Response> => {
  try {
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

    const formData = new URLSearchParams();
    formData.append("entry.1181479366", UserID);
    formData.append("entry.868955826", Name);
    formData.append("entry.413238880", Score);
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
