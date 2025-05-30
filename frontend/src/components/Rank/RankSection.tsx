"use client";
import { useNowMode } from "@/context/NowModeContext";
import { useUser } from "@/context/UserContext";
import { Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toast } from "../common/Toast";
import { RankedGameRecord } from "@/types/Record";
import { ModeColors } from "@/utils/ModeColors";
import { ModeBorderCard } from "../common/ModeBorderCard";

export const RankSection = () => {
  const { User } = useUser();

  const [RankDataSource, setRankDataSource] = useState<
    RankedGameRecord[] | null
  >(null);

  const UserRank = RankDataSource?.find((data) => User && data.id === User.id);

  const { NowMode } = useNowMode();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records/ranking`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.json());
        setRankDataSource(await res.json());
      })
      .catch((error) => {
        console.error("無法獲取排行榜數據:", error);
        Toast.fire({
          icon: "error",
          text: "載入排行榜數據失敗，請稍後再試。",
        });
      });
  }, []);

  return (
    <section>
      <ModeBorderCard
        style={{
          width: "100%",
          padding: "1em 1.5em",
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
              maxHeight: "60vh",
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
                        maxWidth: "8ch",
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
                        maxWidth: "8ch",
                        overflowX: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title="查看個人檔案">
                        <Link href={`/Profile`} style={{ color: "inherit" }}>
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
      </ModeBorderCard>
    </section>
  );
};
