"use client";
import { CustomSessionUser } from "@/app/api/auth/[...nextauth]/route";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Space } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RankTableProps = {
  userId: string;
  rank: number;
  name: string;
  score: number;
  timeStamp: string;
};

export const RankSection = () => {
  const { data: session } = useSession();
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
        const recordMap = new Map<string, Omit<RankTableProps, "rank">>();

        for (const row of RecordRows) {
          const [timeStamp, userId, name, scoreStr] = row;
          const score = parseInt(scoreStr);

          // 如果 ID 不存在於 Map，或新分數更高，則更新
          if (!recordMap.has(userId) || score > recordMap.get(userId)!.score) {
            recordMap.set(userId, { timeStamp, userId, name, score });
          }
        }

        // 轉換為陣列並排序
        const sortedData = Array.from(recordMap.values())
          .sort((a, b) => b.score - a.score)
          .map((value, index) => ({
            rank: index + 1,
            ...value,
          }));
        console.log(sortedData);
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
                <tr
                  key={data.userId}
                  className="Note"
                  style={
                    (session?.user as CustomSessionUser)?.id == data.userId
                      ? { color: "#FFFF69" }
                      : {}
                  }
                >
                  <td className="CenterAlign">{data.rank}</td>
                  <td className="LeftAlign">{data.name}</td>
                  <td className="RightAlign">{data.score}</td>
                  <td
                    className="Hint CenterAlign"
                    style={{ whiteSpace: "wrap" }}
                  >
                    {data.timeStamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="Title" style={{ color: "#FFFFFF" }}>
            資料載入中...
          </div>
        )}
      </Space>
    </section>
  );
};
