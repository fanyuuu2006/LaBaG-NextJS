"use client";
import { useNowMode } from "@/app/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Space } from "antd";
import { useSession } from "next-auth/react";
import { AuthButton } from "../common/AuthButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const LoginSection = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { NowMode } = useNowMode();

  useEffect(() => {
    if (session) {
      router.push("/Profile");
    }
  }, [session, router]);

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
          backgroundColor: ModeColors[NowMode].dark,
          border: `${ModeColors[NowMode].light} solid 3px`,
        }}
      >
        {!session ? (
          <>
            <div className="Label" style={{ color: "#FFFFFF" }}>
              選擇登入方式
            </div>
            <AuthButton type="primary" className="Note" signBy="google" />
          </>
        ) : (
          <></>
        )}
      </Space>
    </section>
  );
};
