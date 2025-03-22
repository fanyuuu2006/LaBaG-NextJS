"use client";
import { Button, ButtonProps } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

interface AuthButtonProps extends ButtonProps {
  signBy?: "google";
}

const AuthIcons: Record<NonNullable<AuthButtonProps["signBy"]>, ReactNode> = {
  google: <GoogleOutlined />,
};

export const AuthButton = ({ signBy, style, ...props }: AuthButtonProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div style={{ color: style?.color ?? "#FFFFFF" }}>載入中</div>;
  }

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      signIn(signBy);
    }
  };

  return (
    <Button
      icon={!session && signBy ? AuthIcons[signBy] : null} // 確保只有登入按鈕有圖示
      {...props}
      style={style}
      onClick={handleAuth}
    >
      {session ? "登出" : "登入"}
    </Button>
  );
};
