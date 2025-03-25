"use client";
import { Button, ButtonProps } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";

interface AuthButtonProps extends ButtonProps {
  signBy: "google";
}

const AuthIcons: Record<NonNullable<AuthButtonProps["signBy"]>, ReactNode> = {
  google: <GoogleOutlined />,
};

export const AuthButton = ({ signBy, style, ...props }: AuthButtonProps) => {
  const { User, Loading, signIn, signOut } = useUser();

  const handleAuth = () => {
    if (User) {
      signOut();
    } else {
      signIn(signBy);
    }
  };

  return Loading ? (
    <></>
  ) : (
    <Button
      icon={AuthIcons[signBy]}
      {...props}
      style={style}
      onClick={handleAuth}
    >
      {User ? "登出" : "登入"}
    </Button>
  );
};
