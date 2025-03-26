"use client";
import { Button, ButtonProps } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { signOptions } from "@/types/Auth";

interface AuthButtonProps extends Omit<ButtonProps, "onClick" | "icon"> {
  signBy: signOptions;
}

const AuthIcons: Record<signOptions, ReactNode> = {
  google: <GoogleOutlined />,
};

export const AuthButton = (props: AuthButtonProps) => {
  const { signBy, style, ...rest } = props;
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
      {...rest}
      style={style}
      onClick={handleAuth}
    >
      {User ? "登出" : "登入"}
    </Button>
  );
};
