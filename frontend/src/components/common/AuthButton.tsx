"use client";
import Image from "next/image";
import { Button, Space } from "antd";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import ModeColors from "@/json/ModeColors.json";
import { useNowMode } from "@/app/NowModeContext";
import { CustomModal, Modal } from "./Alert";
import { CustomSessionUser } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const { NowMode } = useNowMode();
  const [RecordRows, setRecordRows] = useState<string[][]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/Sheet");
        const data = await response.json();
        setRecordRows(data.RecordRows); // 存儲獲取到的資料
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    }

    fetchData(); // 執行異步操作
  }, []); // 只有在組件掛載後執行一次

  return (
    <Space>
      {status === "loading" ? (
        <div style={{ color: "#FFFFFF" }}>載入中</div>
      ) : session ? (
        <Image
          unoptimized={true}
          onClick={() => {
            CustomModal({
              showCancelButton: true,
              html: (
                <Space
                  direction="vertical"
                  align="center"
                  size={0}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: `${ModeColors[NowMode].dark} solid 5px`,
                    borderRadius: "10%",
                    padding: "1em 2em",
                  }}
                >
                  <Image
                    unoptimized={true}
                    width={10}
                    height={10}
                    src={session?.user?.image ?? "/default-avatar.png"}
                    alt="頭像"
                    style={{
                      width: "auto",
                      height: "4em",
                      border: `${ModeColors[NowMode].dark} solid 2px`,
                      borderRadius: "100%",
                    }}
                  />
                  <div className="Label ">{session?.user?.name}</div>
                  <div className="Note">
                    歷史最高分數：
                    <span className="Content">
                      {RecordRows.reduce((res: number, row: string[]) => {
                        return row[1] ===
                          (session?.user as CustomSessionUser)?.id
                          ? Math.max(res, parseInt(row[3].replace(",", "")))
                          : res;
                      }, 0)}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "1em",
                      display: "flex",
                      gap: "0.5em",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        Modal.close();
                      }}
                      style={{}}
                    >
                      關閉
                    </Button>
                    <Button
                      onClick={() => {
                        signOut();
                      }}
                      style={{
                        backgroundColor: "#FF0000",
                        border: "#690000 solid 1px",
                        color: "#FFFFFF",
                      }}
                    >
                      登出
                    </Button>
                  </div>
                </Space>
              ),
            });
          }}
          src={session?.user?.image ?? "/default-avatar.png"}
          width={20}
          height={20}
          alt="頭像"
          style={{
            width: "auto",
            height: "3em",
            border: `${ModeColors[NowMode].dark} solid 2px`,
            borderRadius: "100%",
            cursor: "pointer",
          }}
        />
      ) : (
        <Button
          onClick={() => {
            signIn("google");
          }}
          type="primary"
        >
          <FcGoogle
            className="Note"
            style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}
          />{" "}
          登入
        </Button>
      )}
    </Space>
  );
};
