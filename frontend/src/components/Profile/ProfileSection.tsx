"use client";
import { CustomSessionUser } from "@/app/api/auth/[...nextauth]/route";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Space } from "antd";
import { useSession } from "next-auth/react";
import { AuthButton } from "../common/AuthButton";
import { useEffect, useState } from "react";
import Image from "next/image";

export const ProfileSection = () => {
  const { data: session } = useSession();
  const { NowMode } = useNowMode();

  const [HistoryScore, setHistoryScore] = useState<number>(0);

  useEffect(() => {
    fetch("/api/Sheet")
      .then((res) => res.json())
      .then((data) =>
        setHistoryScore(
          data.RecordRows.reduce((res: number, row: string[]) => {
            return row[1] === (session?.user as CustomSessionUser)?.id
              ? Math.max(res, parseInt(row[3].replace(",", "")))
              : res;
          }, 0)
        )
      )
      .catch((err) => console.error("無法獲取資料: ", err));
  }, [session?.user]);

  return (
    <section>
      <Space
        direction="vertical"
        align="center"
        size="small"
        style={{
          color: "white",
          transition: "0.5s",
          borderRadius: "10%",
          padding: "1em 2em",
          ...(session
            ? {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: `${ModeColors[NowMode].dark} solid 3px`,
              }
            : {
                backgroundColor: ModeColors[NowMode].dark,
                border: `${ModeColors[NowMode].light} solid 3px`,
              }),
        }}
      >
        {session ? (
          <>
            <Space direction="horizontal">
              <Image
                src={session.user?.image ?? ""}
                width={300}
                height={300}
                alt="頭像"
                style={{
                  width: "80%",
                  minWidth: "70px",
                  height: "auto",
                  border: `${ModeColors[NowMode].dark} solid 3px`,
                  borderRadius: "100%",
                }}
              />
              <div>
                <p className="Label">{session.user?.name ?? ""}</p>
                <p className="Hint">{session.user?.email ?? ""}</p>
              </div>
            </Space>
            <p className="Note">
              歷史最高分數: <span className="Content">{HistoryScore}</span>
            </p>
            <AuthButton style={{ backgroundColor: "#FF3333" }} />
          </>
        ) : (
          <>
            <div className="Label" style={{ color: "#FFFFFF" }}>
              請先登入
            </div>
            <AuthButton />
          </>
        )}
      </Space>
    </section>
  );
};
