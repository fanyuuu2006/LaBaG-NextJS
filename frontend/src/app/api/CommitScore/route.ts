export const POST = async (req: Request): Promise<Response> => {
  try {
    const { Name, Score } = await req.json();

    if (!Name || !Score) {
      return new Response(JSON.stringify({ message: "缺少 Name 或 Score" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = new URLSearchParams();
    formData.append("entry.582969025", Name);
    formData.append("entry.995493130", Score);

    const response = await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSfM_lXt981uHStT9Ct17l69Tejb8hNWRb7-B3DyXDJ3KOc0xQ/formResponse",
      {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "伺服器錯誤，無法提交分數" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
