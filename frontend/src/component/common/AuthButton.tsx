"use client";
import Image from "next/image";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import ModeColors from "@/json/ModeColors.json";
import { useNowMode } from "@/app/NowModeContext";

const AuthMenu: MenuProps = {
  items: [
    {
      key: "登出",
      label: (
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
      ),
    },
  ],
};

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const { NowMode } = useNowMode();
  return (
    <Space>
      {status === "loading" ? (
        <div>載入中</div>
      ) : session ? (
        <Dropdown
          menu={{
            items: AuthMenu.items,
            style: {
              backgroundColor: "#FFFFFF",
              border: `${ModeColors[NowMode].dark} solid 3px`,
            },
          }}
          arrow={true}
          placement="bottom"
          trigger={["click"]}
        >
          <Image
            unoptimized={true}
            src={session?.user?.image ?? "/default-avatar.png"}
            width={20}
            height={20}
            alt="頭像"
            style={{
              width: "auto",
              height: "3em",
              border: `${ModeColors[NowMode].light} solid 2px`,
              borderRadius: "100%",
              cursor: "pointer",
            }}
          />
        </Dropdown>
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
