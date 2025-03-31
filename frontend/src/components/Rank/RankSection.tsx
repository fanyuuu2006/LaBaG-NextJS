"use client";
import { useNowMode } from "@/context/NowModeContext";
import { useUser } from "@/context/UserContext";
import ModeColors from "@/json/ModeColors.json";
import { Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toast } from "../common/Alert";
import { RankedGameRecord } from "@/types/Record";

export const RankSection = () => {
  const { User } = useUser();

  const [RankDataSource, setRankDataSource] = useState<
    RankedGameRecord[] | null
  >(null);

  const UserRank = RankDataSource?.find((data) => User && data.id === User.id);

  const { NowMode } = useNowMode();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records/ranking`
        );

        if (!response.ok) throw new Error(await response.json());

        setRankDataSource(await response.json());
      } catch (error) {
        console.error("無法獲取排行榜數據:", error);
        Toast.fire({
          icon: "error",
          text: "載入排行榜數據失敗，請稍後再試。",
        });
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
          marginTop: "0.5em",
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
                <tr className="Note CenterAlign">
                  <th>名次</th>
                  <th>名稱</th>
                  <th>分數</th>
                  <th>時間</th>
                </tr>
              </thead>
              <tbody>
                {RankDataSource.map((data) => (
                  <tr
                    key={data.id}
                    className="Hint"
                    style={{
                      color: User?.id == data.id ? "#FFFF69" : "#FFFFFF",
                    }}
                  >
                    <td className="CenterAlign">{data.rank}</td>
                    <td
                      className="CenterAlign"
                      style={{
                        width: "20%",
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title="查看個人檔案">
                        <Link
                          href={`/Profile/${data.id}`}
                          style={{ color: "inherit" }}
                        >
                          {data.name}
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="RightAlign">{data.score}</td>
                    <td
                      className="CenterAlign"
                      style={{ fontSize: "0.8em", whiteSpace: "wrap" }}
                    >
                      {data.time}
                    </td>
                  </tr>
                ))}
              </tbody>
              {UserRank && (
                <tfoot
                  style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: ModeColors[NowMode].dark,
                    backdropFilter: "blur(2px)",
                    zIndex: 1,
                    border: "#FFFFFF solid 1px",
                  }}
                >
                  <tr className="Hint">
                    <td className="CenterAlign">{UserRank.rank}</td>
                    <td
                      className="CenterAlign"
                      style={{
                        width: "20%",
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title="查看個人檔案">
                        <Link
                          href={`/Profile/${UserRank.id}`}
                          style={{ color: "inherit" }}
                        >
                          {UserRank.name}
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="RightAlign">{UserRank.score}</td>
                    <td
                      className="CenterAlign"
                      style={{ fontSize: "0.8em", whiteSpace: "wrap" }}
                    >
                      {UserRank.time}
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
