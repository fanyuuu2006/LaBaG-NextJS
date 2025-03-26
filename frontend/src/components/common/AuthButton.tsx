"use client";
import { Button, ButtonProps } from "antd";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { signOptions } from "@/types/Auth";

interface AuthButtonProps extends Omit<ButtonProps, "onClick" | "icon"> {
  signBy: signOptions;
}

const AuthItems: Record<signOptions, { label: string; icon: ReactNode }> = {
  google: { label: "Google", icon: <GoogleOutlined /> },
  github: { label: "GitHub", icon: <GithubOutlined /> },
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
      icon={AuthItems[signBy].icon}
      {...rest}
      style={style}
      onClick={handleAuth}
    >
      {AuthItems[signBy].label}
    </Button>
  );
};
