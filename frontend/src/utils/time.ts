import { RecordData } from "@/types/Record";

export const dateTransfrom = (
  time: RecordData["timestamp"] // 2025/3/20 上午 12:34:58
): string => {
  // 先替換上午/下午為 AM/PM
  const replacedTime = time
    .replace("上午", "AM")
    .replace("下午", "PM")
    .replace("年", "/")
    .replace("月", "/")
    .replace("日", "");

  // 把替換後的時間字串轉為符合 JavaScript 解析的格式
  const [datePart, timePart] = replacedTime.split(" ");
  const [year, month, day] = datePart.split("/");

  // 這裡將時間格式拼接成符合標準的日期格式 (YYYY/MM/DD HH:mm:ss)
  const standardTime = `${year}-${month}-${day} ${timePart}`;

  // 用新的時間格式創建 Date 物件
  const date = new Date(standardTime);

  // 檢查日期是否有效
  if (isNaN(date.getTime())) {
    throw new Error("無效的日期格式");
  }

  // 使用 toLocaleString 格式化日期
  const res = date.toLocaleString("zh-TW", {
    year: "numeric", // 完整年分
    month: "2-digit", // 兩位數月
    day: "2-digit", // 兩位數日
    hour: "2-digit", // 兩位數小時
    minute: "2-digit", // 兩位數分鐘
    second: "2-digit", // 兩位數秒數
    hour12: false, // 使用24小時制
  });

  return res;
};
