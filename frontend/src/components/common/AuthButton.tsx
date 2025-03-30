"use client";
import { Button, ButtonProps } from "antd";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { CSSProperties, ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { signOptions } from "@/types/Auth";

interface AuthButtonProps
  extends Omit<ButtonProps, "onClick" | "icon" | "style"> {
  signBy: signOptions;
  style?: Omit<
    CSSProperties,
    "padding" | "paddingTop" | "paddingBottom" | "paddingLeft" | "paddingRight"
  >;
}

const AuthItems: Record<signOptions, { label: string; icon: ReactNode }> = {
  google: { label: "Google", icon: <GoogleOutlined /> },
  github: { label: "GitHub", icon: <GithubOutlined /> },
};

export const AuthButton = (props: AuthButtonProps) => {
  const { signBy, style, ...rest } = props;
  const { User, Loading, signIn, signOut } = useUser();

  const handleAuth = User ? signOut : () => signIn(signBy);
  
  if (Loading) return null;
  return (
    <Button
      icon={AuthItems[signBy].icon}
      {...rest}
      style={{
        ...style,
        padding: "1em 2em",
      }}
      onClick={handleAuth}
    >
      {AuthItems[signBy].label}
    </Button>
  );
};
