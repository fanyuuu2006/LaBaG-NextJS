import { HistoryData } from "./ProfileSection";

export const HistoryTable = ({
  HistoryDatas,
}: {
  HistoryDatas: HistoryData[];
}) => {
  return (
    <>
      <div className="Content CenterAlign">歷史紀錄</div>
      <div
        style={{
          maxHeight: "400px", // 限制表格的最大高度
          overflowY: "auto", // 開啟垂直滾動條
          width: "100%",
          border: "#FFFFFF solid 1px",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            color: "#FFFFFF",
            width: "100%",
          }}
        >
          <thead
            style={{
              position: "sticky", // 使表頭固定
              top: 0, // 固定在頂部
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 根據模式顏色設置背景色
              backdropFilter: "blur(2px)",
              zIndex: 1, // 確保表頭在其他內容之上
            }}
          >
            <tr className="Content">
              <th className="CenterAlign">時間</th>
              <th className="RightAlign">分數</th>
            </tr>
          </thead>
          <tbody>
            {HistoryDatas?.sort((a, b) => b.index - a.index)
              .slice(-20)
              .map((data: HistoryData, i: number) => (
                <tr key={i} className="Note">
                  <td className="CenterAlign">{data.timestamp}</td>

                  <td className="RightAlign" style={{ whiteSpace: "nowrap" }}>
                    {data.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
