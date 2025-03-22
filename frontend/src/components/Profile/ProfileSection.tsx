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
      <Space
        direction="vertical"
        align="center"
        size="small"
        style={{
          color: "white",
          transition: "ease-in-out 0.5s",
          borderRadius: "10px",
          padding: "1em 2em",
          backgroundColor: User
            ? "rgba(0, 0, 0, 0.5)"
            : ModeColors[NowMode].dark,
          border: `${
            User ? ModeColors[NowMode].dark : ModeColors[NowMode].light
          } solid 3px`,
        }}
      >
        {User && (
          <>
            <div className="Title">個人檔案</div>
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
            <div className="Note">
              歷史最高分數:{" "}
              <span className="Label">
                {/*補空格*/}
                {String(
                  HistoryDatas?.length
                    ? Math.max(...HistoryDatas.map((h: HistoryData) => h.score))
                    : 0
                ).padStart(8, "\u00A0")}
              </span>{" "}
              分
            </div>

            <div
              style={{
                maxHeight: "400px", // 限制表格的最大高度
                overflowY: "auto", // 開啟垂直滾動條
                width: "100%",
              }}
            >
              <table>
                <thead>
                  <tr className="Content">
                    <th className="CenterAlign">時間</th>
                    <th className="RightAlign">分數</th>
                  </tr>
                </thead>
                <tbody>
                  {(HistoryDatas ?? [])
                    .slice(-20)
                    .map((data: HistoryData, i: number) => (
                      <tr key={i} className="Note">
                        <td className="LeftAlign">{data.timestamp}</td>
                        <td className="RightAlign">{data.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <AuthButton
              style={{ backgroundColor: "#FF3333", marginTop: "0.5em" }}
            />
          </>
        )}
      </Space>
    </section>
  );
};
