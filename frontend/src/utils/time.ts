import { RecordData } from "@/types/Record";

export const dateTransfrom = (
  time: RecordData["timestamp"] // 2025/3/20 上午 12:34:58
): string => {
  const replacedTime = time.replace("上午", "AM").replace("下午", "PM");
  const date = new Date(Date.parse(replacedTime));
  // "2025/03/04 21:00:00"
  const res = date.toLocaleString("zh-TW", {
    year: "numeric", // 完整年分
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24 小時制制
  });

  return res;
};
