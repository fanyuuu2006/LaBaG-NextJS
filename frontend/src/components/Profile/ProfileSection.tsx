"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Button, Space, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import { AuthButton } from "../common/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CopyOutlined } from "@ant-design/icons";
import { Toast } from "../common/Alert";
import { CustomSessionUser } from "@/lib/authOptions";

type HistoryData = {
  timestamp: string;
  score: number;
};

export const ProfileSection = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const User = session?.user as CustomSessionUser | null;
  const { NowMode } = useNowMode();

  const [HistoryDatas, setHistoryDatas] = useState<HistoryData[] | null>(null);

  useEffect(() => {
    if (!User?.id) {
      router.push("/Login");
      return;
    }

    fetch("/api/Sheet")
      .then((res) => {
        if (!res.ok) throw new Error("API 回應錯誤");
        return res.json();
      })
      .then((data) =>
        setHistoryDatas(
          data.RecordRows.filter((row: string[]) => row[1] === User.id).map(
            (row: string[]) => ({
              timestamp: row[0],
              score: parseInt(row[3]),
            })
          )
        )
      )
      .catch((error) => console.error("無法獲取資料: ", error));
  }, [User?.id, router]);

  return (
    <section>
      <div
        style={{
          width: "100%",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "1em 2em",
          backgroundColor: User
            ? "rgba(0, 0, 0, 0.5)"
            : ModeColors[NowMode].dark,
          border: `${
            User ? ModeColors[NowMode].dark : ModeColors[NowMode].light
          } solid 3px`,
          borderRadius: "10px",
        }}
      >
        {User && (
          <>
            <div className="Title BottomLine">個人檔案</div>
            <Space direction="horizontal" align="center" size="middle">
              <Image
                unoptimized={true}
                src={User?.image ?? "./DefaultAvator.jpg"}
                width={300}
                height={300}
                alt="頭像"
                style={{
                  width: "5em",
                  minWidth: "70px",
                  height: "auto",
                  border: `${ModeColors[NowMode].dark} solid 3px`,
                  borderRadius: "100%",
                }}
              />
              <div>
                <div className="Label">{User?.name ?? ""}</div>
                <div className="Hint">{User?.email ?? ""}</div>
                <div className="Hint">
                  ID: {User.id ?? ""}
                  <Tooltip title="複製 ID">
                    <Button
                      type="text"
                      onClick={() => {
                        if (User.id)
                          navigator.clipboard
                            .writeText(User.id)
                            .then(() => {
                              Toast.fire({
                                icon: "success",
                                text: "已複製到剪貼簿",
                              });
                            })
                            .catch((error) => {
                              console.error("複製失敗: ", error);
                              Toast.fire({
                                icon: "error",
                                text: "複製失敗",
                              });
                            });
                      }}
                      icon={<CopyOutlined />}
                      style={{ color: "#FFFFFF" }}
                    />
                  </Tooltip>
                </div>
              </div>
            </Space>
            {HistoryDatas && (
              <>
                <div className="Note CenterAlign">
                  歷史最高分數:{" "}
                  <span className="Label">
                    {/*補空格*/}
                    {String(
                      HistoryDatas?.length
                        ? Math.max(
                            ...HistoryDatas.map((h: HistoryData) => h.score)
                          )
                        : 0
                    ).padStart(8, "\u00A0")}
                  </span>{" "}
                  分
                </div>
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
                      {HistoryDatas?.sort((a, b) => b.score - a.score)
                        .slice(-20)
                        .map((data: HistoryData, i: number) => (
                          <tr key={i} className="Note">
                            <td className="CenterAlign">{data.timestamp}</td>

                            <td
                              className="RightAlign"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {data.score}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="CenterAlign">
              <AuthButton
                type="text"
                style={{
                  color: "#FFFFFF",
                  width: "50%",
                  backgroundColor: "#FF3333",
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
