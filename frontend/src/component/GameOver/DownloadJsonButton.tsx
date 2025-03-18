import { Game } from "@/lib/PlayLaBaG";
import { Button } from "antd";

export const DownloadJsonButton = () => {
  const JsonFile = () => {
    // 取得當前日期，格式化為 YYYYMMDD
    const Today = new Date();
    const FormattedDate = Today.toISOString().slice(0, 10).replace(/-/g, ""); // 轉換成 YYYYMMDD
    const FileName = `${Game.Score}_${FormattedDate}.json`;

    const jsonstring = JSON.stringify(Game.AllData, null, 4);
    const blob = new Blob([jsonstring], { type: "application/json" }); //Blob 是 JavaScript 的二進制物件
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); // 建立 <a> 標籤
    a.href = url;
    a.download = FileName; // 設定下載的檔案名稱
    document.body.appendChild(a);
    a.click(); // 觸發點擊下載
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // 釋放 URL
  };

  return (
    <>
      <Button
        onClick={JsonFile}
        style={{
          color: "#000000",
          border: "#878700 solid 2px",
          backgroundColor: "#FFFF00 ",
        }}
      >
        保存本次紀錄檔案(.json)
      </Button>
    </>
  );
};
