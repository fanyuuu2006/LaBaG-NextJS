import { CommitScoreProps } from "@/types/Record";

export const CommitScore = async (props: CommitScoreProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json", // 指定 JSON 類型
        },
        body: JSON.stringify(props),
      }
    );

    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.error("無法提交分數:", error);
  }
};
