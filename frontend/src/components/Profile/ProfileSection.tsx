"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Space, Tooltip } from "antd";
import { useNowMode } from "@/context/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { useEffect, useRef, useState } from "react";
import { CopyOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { CustomModal, Toast } from "@/components/common/Alert";
import { HistoryTable } from "./HistoryTable";
import { useUser } from "@/context/UserContext";
import { gameRecord } from "@/types/Record";

export const ProfileSection = ({ UserID }: { UserID?: string }) => {
  const { NowMode } = useNowMode();
  const { User, Loading, refreshUser } = useUser(UserID as string);

  const [HistoryScore, setHistoryScore] = useState<number>(0);
  const [HistoryRecord, setHistoryRecord] = useState<gameRecord[]>([]);
  const [searchID, setSearchID] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!User) return;

    const fetchData = async () => {
      try {
        const records = await User.getHistoryRecord();
        setHistoryRecord(records);
        setHistoryScore(await User.historyScore());
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
          <div className="Title" style={{ color: "white" }}>
            資料載入中...
          </div>
        ) : User ? (
          <>
            <div className="Title BottomLine">個人檔案</div>
            <Space direction="horizontal" align="center" size="middle">
              <Image
                unoptimized={true}
                src={User?.image ?? "/DefaultAvator.jpg"}
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
                <div
                  className="Content"
                  style={{
                    overflowX: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {User?.name ?? ""}
                  {!UserID && (
                    <Tooltip title="修改使用者名稱">
                      <Button
                        type="text"
                        style={{ fontSize: "inherit", color: "inherit" }}
                        onClick={() => {
                          CustomModal({
                            html: (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  backdropFilter: "blur(2px)",
                                  border: `3px solid ${ModeColors[NowMode].dark}`,
                                  borderRadius: "10px",
                                  padding: "1em",
                                  gap: "1em",
                                  textAlign: "start",
                                }}
                              >
                                <input
                                  type="text"
                                  placeholder="請輸入新使用者名稱"
                                  className="Note"
                                  style={{
                                    color: "#FFFFFF",
                                    border: `2px solid ${ModeColors[NowMode].dark}`,
                                    borderRadius: "5px",
                                    padding: "0.5em",
                                  }}
                                  ref={nameInputRef}
                                />
                                <Button
                                  type="text"
                                  style={{
                                    color: "#FFFFFF",
                                    border: `1px solid ${ModeColors[NowMode].dark}`,
                                  }}
                                  onClick={async () => {
                                    try {
                                      const newName =
                                        nameInputRef.current?.value;

                                      const response = await fetch(
                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/users`,
                                        {
                                          method: "PATCH",
                                          headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${localStorage.getItem(
                                              "authToken"
                                            )}`,
                                          },
                                          body: JSON.stringify({
                                            field: "name",
                                            value: newName,
                                          }),
                                        }
                                      );
                                      if (response.status !== 200)
                                        throw new Error(
                                          (await response.json()).error ??
                                            "未知錯誤"
                                        );
                                      Toast.fire({
                                        icon: "success",
                                        title: "暱稱修改成功",
                                      });
                                      setTimeout(refreshUser, 1000);
                                    } catch (err) {
                                      console.error(err);
                                      Toast.fire({
                                        icon: "error",
                                        title: "暱稱更新失敗，請稍後再試...",
                                        text: err as string,
                                      });
                                    }
                                  }}
                                >
                                  保存
                                </Button>
                              </div>
                            ),
                          });
                        }}
                        icon={<EditOutlined />}
                      />
                    </Tooltip>
                  )}
                </div>
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
                      style={{ color: "inherit" }}
                    />
                  </Tooltip>
                </div>
              </div>
            </Space>

            <div className="Note CenterAlign">
              歷史最高分數:{" "}
              <span className="Label">
                {/*補空格*/}
                {HistoryScore?.toLocaleString().padStart(10, "\u00A0")}
              </span>{" "}
              分
            </div>

            <HistoryTable HistoryRecord={HistoryRecord} />
          </>
        ) : (
          <>
            <div className="Label CenterAlign BottomLine">查詢玩家個人檔案</div>
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
            {UserID && <div className="Hint">找不到 ID 為 {UserID} 的玩家</div>}
          </>
        )}
      </div>
    </section>
  );
};
