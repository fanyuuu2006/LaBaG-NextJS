"use client";
import { Button, ButtonProps } from "antd";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { useUser } from "@/context/UserContext";
import { signOptions } from "@/types/Auth";

interface AuthButtonProps extends Omit<ButtonProps, "onClick" | "icon"> {
  signBy: signOptions;
}

const AuthItems: Record<signOptions, { label: string; icon: React.ReactNode }> =
  {
    google: { label: "Google", icon: <GoogleOutlined /> },
    github: { label: "GitHub", icon: <GithubOutlined /> },
  };

/**
 * 登入身分驗證按鈕組件
 * @component
 * @param {signOptions} props.signBy - 指定登入方式
 */

export const AuthButton = (props: AuthButtonProps) => {
  const { signBy, style, ...rest } = props;
  const { User, Loading, signIn, signOut } = useUser();

  const handleAuth = User ? signOut : () => signIn(signBy);
  const authItem = AuthItems[signBy];
  return (
    <Button
      disabled={Loading}
      icon={authItem.icon}
      {...rest}
      style={{ padding: "1em 2em", ...style }}
      onClick={handleAuth}
    >
      {authItem.label}
    </Button>
  );
};
