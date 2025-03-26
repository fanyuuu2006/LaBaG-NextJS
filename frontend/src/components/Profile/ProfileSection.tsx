"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Space, Tooltip } from "antd";
import { useNowMode } from "@/context/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { useEffect, useState } from "react";
import { CopyOutlined, SearchOutlined } from "@ant-design/icons";
import { Toast } from "@/components/common/Alert";
import { HistoryTable } from "./HistoryTable";
import { useUser } from "@/context/UserContext";
import { RecordData } from "@/types/Record";

export const ProfileSection = ({ UserID }: { UserID?: string }) => {
  const { NowMode } = useNowMode();
  const { User, Loading } = useUser(UserID as string);

  const [HistoryScore, setHistoryScore] = useState<number | null>(null);
  const [HistoryRecord, setHistoryRecord] = useState<RecordData[]>([]);
  const [searchID, setSearchID] = useState<string | null>(null);

  useEffect(() => {
    if (!User) return;

    const fetchData = async () => {
      try {
        const records = await User.getHistoryRecord();
        setHistoryRecord(records ?? []);
        setHistoryScore(User.historyScore());
      } catch (error) {
        console.error("Error fetching history records:", error);
        Toast.fire({
          icon: "error",
          text: "載入歷史紀錄失敗，請稍後再試。",
        });
      }
    };

    fetchData();
  }, [User]); // 依賴 User

  return (
    <section>
      <div
        style={{
          width: User ? "100%" : "auto",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          padding: "1em 2em",
          marginTop: "3em",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: `${ModeColors[NowMode].dark} solid 3px`,
          borderRadius: "10px",
          transition: "ease-in-out 0.5s",
        }}
      >
        {Loading ? (
          <>資料載入中</>
        ) : User ? (
          <>
            <div className="Title BottomLine">個人檔案</div>
            <Space direction="horizontal" align="center" size="middle">
              <Image
                unoptimized={true}
                src={
                  User?.image && User?.image.length > 1
                    ? User.image
                    : "/DefaultAvator.jpg"
                }
                width={300}
                height={300}
                alt="頭像"
                style={{
                  width: "4.5em",
                  minWidth: "70px",
                  height: "auto",
                  border: `${ModeColors[NowMode].dark} solid 3px`,
                  borderRadius: "100%",
                }}
              />
              <div>
                <div className="Content">{User?.name ?? ""}</div>
                <div className="Hint">
                  {User.id ?? ""}
                  <Tooltip title="複製 ID">
                    <Button
                      type="text"
                      onClick={async () => {
                        if (!User?.id) return;
                        await navigator.clipboard
                          .writeText(User.id)
                          .then(() =>
                            Toast.fire({
                              icon: "success",
                              text: "已複製到剪貼簿",
                            })
                          )
                          .catch(() =>
                            Toast.fire({ icon: "error", text: "複製失敗" })
                          );
                      }}
                      icon={<CopyOutlined />}
                      style={{ color: "#FFFFFF" }}
                    />
                  </Tooltip>
                </div>
              </div>
            </Space>
            {User && (
              <>
                <div className="Note CenterAlign">
                  歷史最高分數:{" "}
                  <span className="Label">
                    {/*補空格*/}
                    {HistoryScore?.toString().padStart(8, "\u00A0")}
                  </span>{" "}
                  分
                </div>

                <HistoryTable HistoryRecord={HistoryRecord} />
              </>
            )}
          </>
        ) : (
          <>
            {UserID && <div className="Note">找不到 ID 為 {UserID} 的玩家</div>}
            <Input
              type="text"
              placeholder="請輸入玩家 ID"
              className="Content"
              styles={{
                affixWrapper: {
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  border: `${ModeColors[NowMode].dark} solid 1px`,
                },
              }}
              suffix={
                <Link href={searchID ? `/Profile/${searchID}` : "#"}>
                  <SearchOutlined />
                </Link>
              }
              onChange={(e) => {
                setSearchID(e.target.value.trim());
              }}
            />
          </>
        )}
      </div>
    </section>
  );
};
