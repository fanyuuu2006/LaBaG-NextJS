"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { CustomSessionUser } from "@/lib/authOptions";
import { Tooltip } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  const User = session?.user as CustomSessionUser;

  const [RankDataSource, setRankDataSource] = useState<RankTableProps[] | null>(
    null
  );
  const UserRank = RankDataSource?.find(
    (data) => User && data.userId === User.id
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
      <div
        style={{
          width: "100%",
          transition: "ease-in-out 0.5s",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          border: `${ModeColors[NowMode].dark} solid 5px`,
          borderRadius: "10px",
          padding: "1.5em 1em",
        }}
      >
        <div
          className="Title CenterAlign"
          style={{ color: "#FFFFFF", paddingBottom: "0.5em" }}
        >
          排行榜
        </div>

        {RankDataSource ? (
          <div
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              border: "#FFFFFF solid 1px",
            }}
          >
            <table
              style={{
                borderCollapse: "collapse",
                whiteSpace: "nowrap",
                color: "#FFFFFF",
                width: "100%",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(2px)",
                  zIndex: 1,

                  border: "#FFFFFF solid 1px",
                }}
              >
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
                    style={{
                      // backgroundColor:
                      //   data.rank === 1
                      //     ? "rgba(128, 0, 0, 0.5)"
                      //     : data.rank === 2
                      //     ? "rgba(128, 64, 0, 0.5)"
                      //     : data.rank === 3
                      //     ? "rgba(128, 128, 0, 0.5)"
                      //     : "transparent",
                      color: User?.id == data.userId ? "#FFFF69" : "#FFFFFF",
                    }}
                  >
                    <td className="CenterAlign">{data.rank}</td>
                    <td className="CenterAlign">
                      <Tooltip title="查看個人檔案">
                        <Link
                          href={`/Profile/${data.userId}`}
                          style={{ color: "inherit" }}
                        >
                          {data.name}
                        </Link>
                      </Tooltip>
                    </td>
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
              {UserRank && (
                <tfoot
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "rgba(0, 81, 255, 0.5)",
                    backdropFilter: "blur(2px)",
                    zIndex: 1,
                    border: "#FFFFFF solid 1px",
                  }}
                >
                  <tr className="Note">
                    <td className="CenterAlign">{UserRank.rank}</td>
                    <td className="CenterAlign">
                      <Tooltip title="查看個人檔案">
                        <Link
                          href={`/Profile/${UserRank.userId}`}
                          style={{ color: "inherit" }}
                        >
                          {UserRank.name}
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="RightAlign">{UserRank.score}</td>
                    <td
                      className="Hint CenterAlign"
                      style={{ whiteSpace: "wrap" }}
                    >
                      {UserRank.timeStamp}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        ) : (
          <div className="Content CenterAlign" style={{ color: "#FFFFFF" }}>
            資料載入中...
          </div>
        )}
      </div>
    </section>
  );
};
