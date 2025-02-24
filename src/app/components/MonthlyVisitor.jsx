// 待開發
import { useEffect, useState } from "react";

export default function MonthlyVisitors() {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    // 確保 window.gtag 可用
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        event_callback: async () => {
          try {
            const response = await fetch("/api/visitors");
            const data = await response.json();
            console.log(data);
            setVisitors(data.visitors);
          } catch (error) {
            console.error("無法擷取訪客數: ", error);
          }
        },
      });
    }
  }, []);

  return (
    <div className="MonthlyVisitor">
      <p>{`本月訪客數：${visitors !== null ? visitors : "載入中..."}`}</p>
    </div>
  );
}
