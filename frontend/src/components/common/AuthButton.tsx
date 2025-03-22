"use client";
import { Button, ButtonProps } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleOutlined } from "@ant-design/icons";

export const AuthButton = (props: ButtonProps) => {
  const { data: session, status } = useSession();

  return status === "loading" ? (
    <div style={{ color: "#FFFFFF" }}>載入中</div>
  ) : (
    <Button
      icon={session ? null: <GoogleOutlined /> }
      {...props}
      onClick={() => (session ? signOut() : signIn("google"))}
      type="primary"
    >
      {session ? "登出" : "登入" }
    </Button>
  );
};
