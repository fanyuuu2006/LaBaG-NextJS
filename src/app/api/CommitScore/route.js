export async function POST(req) {
  try {
    const { Name, Score } = await req.json();

    if (!Name || !Score) {
      return Response.json({ message: "缺少 Name 或 Score" }, { status: 400 });
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

    if (response.ok) {
      return Response.json({ message: " 成功提交分數" }, { status: 200 });
    } else {
      return Response.json(
        { message: ` 提交失敗，回應狀態: ${response.status}` },
        { status: response.status }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "伺服器錯誤，無法提交分數" },
      { status: 500 }
    );
  }
}
