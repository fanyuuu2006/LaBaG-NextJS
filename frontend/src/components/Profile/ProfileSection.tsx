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
  const User = session?.user as CustomSessionUser | null;
  const { NowMode } = useNowMode();

  const [HistoryScore, setHistoryScore] = useState<number>(0);

  useEffect(() => {
    if (!User?.id) return;
    fetch("/api/Sheet")
      .then((res) => res.json())
      .then((data) =>
        setHistoryScore(
          data.RecordRows.reduce(
            (res: number, row: string[]) =>
              row[1] === User?.id ? Math.max(res, parseInt(row[3])) : res,
            0
          )
        )
      )
      .catch((err) => console.error("無法獲取資料: ", err));
  }, [User?.id]);

  return (
    <section>
      <Space
        direction="vertical"
        align="center"
        size="small"
        style={{
          color: "white",
          transition: "ease-in-out 0.5s",
          borderRadius: "10%",
          padding: "1em 2em",
          backgroundColor: User
            ? "rgba(0, 0, 0, 0.5)"
            : ModeColors[NowMode].dark,
          border: `${
            User ? ModeColors[NowMode].dark : ModeColors[NowMode].light
          } solid 3px`,
        }}
      >
        {User ? (
          <>
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
                <p className="Title">{User?.name ?? ""}</p>
                <p className="Note">{User?.email ?? ""}</p>
              </div>
            </Space>
            <p className="Note">
              歷史最高分數: <span className="Label">{HistoryScore}</span>
            </p>
            <AuthButton
              style={{ backgroundColor: "#FF3333", marginTop: "0.5em" }}
            />
          </>
        ) : (
          <>
            <div className="Label" style={{ color: "#FFFFFF" }}>
              請先登入
            </div>
            <AuthButton className="Note" />
          </>
        )}
      </Space>
    </section>
  );
};
