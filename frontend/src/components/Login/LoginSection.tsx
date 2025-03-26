"use client";
import { useNowMode } from "@/context/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Space } from "antd";
import { AuthButton } from "../common/AuthButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export const LoginSection = () => {
  const { User } = useUser();
  const router = useRouter();

  const { NowMode } = useNowMode();

  useEffect(() => {
    if (User) {
      router.push(`/Profile/${User.id}`);
    }
  }, [User, router]);

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
        {!User ? (
          <>
            <div className="Label" style={{ color: "#FFFFFF" }}>
              選擇登入方式
            </div>
            <AuthButton
              type="primary"
              className="Note"
              signBy="google"
              style={{ padding: "1em" }}
            />
          </>
        ) : (
          <></>
        )}
      </Space>
    </section>
  );
};
