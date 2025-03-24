import { HistoryRecordData } from "@/context/UserContext";

export const HistoryTable = ({
  HistoryRecord,
}: {
  HistoryRecord: HistoryRecordData[];
}) => {
  return (
    <>
      <div className="Content CenterAlign">歷史紀錄</div>
      <div
        style={{
          maxHeight: "50vh", // 限制表格的最大高度
          overflowY: "auto", 
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
              top: 0, 
              backgroundColor: "rgba(0, 0, 0, 0.5)", 
              backdropFilter: "blur(2px)",
              zIndex: 1, 
            }}
          >
            <tr className="Content CenterAlign">
              <th>時間</th>
              <th>分數</th>
            </tr>
          </thead>
          <tbody>
            {HistoryRecord?.sort((a, b) => b.index - a.index)
              .slice(0, 20)
              .map((data: HistoryRecordData, i: number) => (
                <tr key={i} className="Note CenterAlign">
                  <td>{data.timestamp}</td>

                  <td style={{ whiteSpace: "nowrap" }}>{data.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
