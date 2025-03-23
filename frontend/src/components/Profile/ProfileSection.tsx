"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Button, Space, Tooltip } from "antd";
import { AuthButton } from "@/components/common/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CopyOutlined } from "@ant-design/icons";
import { Toast } from "@/components/common/Alert";
import { CustomSessionUser } from "@/lib/authOptions";
import { HistoryTable } from "./HistoryTable";
import { SheetDatas } from "@/lib/Sheet";

export type HistoryData = {
  index: number;
  timestamp: string;
  score: number;
};

export const ProfileSection = ({ UserID }: { UserID: string }) => {
  const router = useRouter();
  const [User, setUser] = useState<CustomSessionUser | null>(null);
  const { NowMode } = useNowMode();

  const [HistoryDatas, setHistoryDatas] = useState<HistoryData[] | null>(null);

  useEffect(() => {
    fetch("/api/Sheet")
      .then(async (res) => {
        if (!res.ok) throw new Error("API 回應錯誤");
        return await res.json();
      })
      .then((data: SheetDatas) => {
        const userData = data.UserRows.filter((row) => row[1] === UserID)[0];
        setUser({
          id: userData[1] ?? "",
          name: userData[2] ?? "",
          email: userData[3] ?? "",
          image: userData[4] ?? "",
        });

        setHistoryDatas(
          data.RecordRows.filter((row) => row[1] === UserID).map(
            (row, index: number) => ({
              index,
              timestamp: row[0] ?? "",
              score: parseInt(row[3] ?? "0"),
            })
          )
        );
      })
      .catch((error) => console.error("無法獲取資料: ", error));
  }, [UserID, router]);

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
          marginTop: "3em",
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

                <HistoryTable HistoryDatas={HistoryDatas} />
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
