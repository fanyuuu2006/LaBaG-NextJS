import { FormProps } from "@/app/api/CommitScore/route";

export const CommitScore = async (props: FormProps) => {
  if (props.UserID && props.Name && props.Score) {
    try {
      const response = await fetch("/api/CommitScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          props
          //   , (_, value) =>
          //   {
          //   // 如果 value 是一個物件，則轉成 JSON 字串
          //   if (typeof value === "object") {
          //     return JSON.stringify(value);
          //   }
          //   return value;
          // }
        ),
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
