import { gameRecord } from "@/types/Record";

export const HistoryTable = ({
  HistoryRecord,
}: {
  HistoryRecord: gameRecord[];
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
          className="Hint CenterAlign"
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
            <tr>
              <th>時間</th>
              <th>分數</th>
            </tr>
          </thead>
          <tbody>
            {HistoryRecord.length > 0 ? (
              HistoryRecord.map((record: gameRecord, index: number) => ({
                index,
                ...record,
              }))
                .sort((a, b) => b.index - a.index)
                .slice(0, 20)
                .map((data: gameRecord, i: number) => (
                  <tr key={i}>
                    <td>{data.time}</td>

                    <td style={{ whiteSpace: "nowrap" }}>{data.score}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={2}>暫無資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
