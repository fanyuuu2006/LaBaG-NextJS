import { CommitScoreProps } from "@/types/Record";

export const CommitScore = async (props: CommitScoreProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
