import { FormProps } from "@/app/api/CommitScore/route";

export const CommitScore = async (props: FormProps) => {
  if (props.UserID && props.Name && props.Score) {
    try {
      const response = await fetch("/api/CommitScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify(props),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("無法提交分數:", error);
    }
  }
};
