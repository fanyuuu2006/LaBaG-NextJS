"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Space } from "antd";
import { useEffect, useState } from "react";

type RankTableProps = {
  key: number;
  rank: number;
  name: string;
  score: number;
  timestamp: string;
};

// const RankColumns: ColumnType<RankTableProps>[] = [
//   {
//     title: "名次",
//     dataIndex: "rank",
//     key: "rank",
//     align: "center",
//   },
//   {
//     title: "名稱",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "分數",
//     dataIndex: "score",
//     key: "score",
//     align: "right",
//   },
//   {
//     title: "時間",
//     dataIndex: "timestamp",
//     key: "timestamp",
//     align: "center",
//   },
// ];

export const RankSection = () => {
  const [RankDataSource, setRankDataSource] = useState<RankTableProps[] | null>(
    null
  );
  const { NowMode } = useNowMode();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/Sheet");
        const data = await response.json();
        const RecordRows = data.RecordRows as string[][];

        // 使用 Map 來存放每位玩家的最高分
        const recordMap = new Map<
          string,
          { name: string; score: number; timestamp: string }
        >();

        for (const row of RecordRows) {
          const [timestamp, userId, name, scoreStr] = row;
          const score = parseInt(scoreStr);

          // 如果 ID 不存在於 Map，或新分數更高，則更新
          if (!recordMap.has(userId) || score > recordMap.get(userId)!.score) {
            recordMap.set(userId, { name, score, timestamp });
          }
        }

        // 轉換為陣列並排序
        const sortedData = Array.from(recordMap.values())
          .sort((a, b) => b.score - a.score)
          .map((value, index) => ({
            key: index,
            rank: index + 1,
            ...value,
          }));

        setRankDataSource(sortedData);
      } catch (error) {
        console.error("無法獲取排行榜數據:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      <Space
        direction="vertical"
        align="center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          border: `${ModeColors[NowMode].dark} solid 5px`,
          borderRadius: "10px",
          padding: "1.5em 0.5em",
        }}
      >
        {RankDataSource ? (
          <table
            style={{
              borderCollapse: "collapse",
              whiteSpace: "nowrap",
              color: "#FFFFFF",
              width: "100%",
            }}
          >
            <thead>
              <tr className="Content CenterAlign">
                <th>名次</th>
                <th>名稱</th>
                <th>分數</th>
                <th>時間</th>
              </tr>
            </thead>
            <tbody>
              {RankDataSource.map((data) => (
                <tr key={data.key} className="Note">
                  <td className="CenterAlign">{data.rank}</td>
                  <td className="LeftAlign">{data.name}</td>
                  <td className="RightAlign">{data.score}</td>
                  <td
                    className="Hint CenterAlign"
                    style={{ whiteSpace: "wrap" }}
                  >
                    {data.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="Title" style={{ color: "#FFFFFF" }}>
            資料載入中
          </div>
        )}
      </Space>
    </section>
  );
};
