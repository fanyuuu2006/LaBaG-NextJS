"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Button, Space, Tooltip } from "antd";
import { AuthButton } from "@/components/common/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CopyOutlined, SearchOutlined } from "@ant-design/icons";
import { Toast } from "@/components/common/Alert";
import { CustomSessionUser } from "@/lib/authOptions";
import { HistoryTable } from "./HistoryTable";
import { SheetDatas } from "@/lib/Sheet";
import { useSession } from "next-auth/react";
import Link from "next/link";

export type HistoryData = {
  index: number;
  timestamp: string;
  score: number;
};

export const ProfileSection = ({ UserID }: { UserID: string | null }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [User, setUser] = useState<CustomSessionUser | null>(null);
  const { NowMode } = useNowMode();
  const [HistoryDatas, setHistoryDatas] = useState<HistoryData[] | null>(null);

  const [searchID, setSearchID] = useState<string | null>(null);

  useEffect(() => {
    if (UserID === "undefined") {
      router.push("/Login");
    }

    fetch("/api/Sheet")
      .then(async (res) => {
        if (!res.ok) throw new Error("API 回應錯誤");
        return await res.json();
      })
      .then((data: SheetDatas) => {
        const userData = data.UserRows.filter((row) => row[1] === UserID)[0];
        if (!userData) return;
        setUser({
          id: userData[1] ?? "",
          name: userData[2] ?? "",
          email: userData[3] ?? "",
          image: userData[4] ?? "",
        });

        setHistoryDatas(
          data.RecordRows?.filter((row) => row[1] === UserID)?.map(
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
        }}
      >
        {User ? (
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
                  width: "5em",
                  minWidth: "70px",
                  height: "auto",
                  border: `${ModeColors[NowMode].dark} solid 3px`,
                  borderRadius: "100%",
                }}
              />
              <div>
                <div className="Label">{User?.name ?? ""}</div>
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
            {session && (session?.user as CustomSessionUser).id === UserID && (
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
            )}
          </>
        ) : (
          <>
            {" "}
            {UserID && <div className="Note">找不到 ID 為 {UserID} 的用戶</div>}
            <div
              className="Content"
              style={{
                padding: "0.5em",
                border: `2px solid ${ModeColors[NowMode].dark}`,
              }}
            >
              <input
                type="text"
                placeholder="請輸入用戶 ID"
                onChange={(e) => {
                  setSearchID(e.target.value);
                }}
              />
              <Link href={`/Profile/${searchID}`}>
                <SearchOutlined />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
