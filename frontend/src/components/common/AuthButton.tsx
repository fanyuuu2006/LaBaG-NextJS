"use client";
import { Button, ButtonProps } from "antd";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = (props: ButtonProps) => {
  const { data: session, status } = useSession();

  return status === "loading" ? (
    <div style={{ color: "#FFFFFF" }}>載入中</div>
  ) : (
    <Button
      icon={
        !session ? (
          <FcGoogle
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "100%",
              padding: "5px",
            }}
          />
        ) : null
      }
      {...props}
      onClick={() => (session ? signOut() : signIn("google"))}
      type="primary"
    >
      {session ? "登出" : <>登入</>}
    </Button>
  );
};
