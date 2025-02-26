import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import UserButton from "./UserButton";

export default function LoginButton() {
  const { data: session, status } = useSession();

  return (
    <div style={{ position: "fixed", top: "10px", right: "10px" }}>
      {status === "loading" ? (
        <p style={{ color: "#FFFFFF", fontWeight: "bold", left: 0 }}>
          載入中...
        </p>
      ) : session ? (
        <>
          <UserButton />
        </>
      ) : (
        <button className="LoginButton" onClick={() => signIn("google")}>
          <FcGoogle
            style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}
          />{" "}
          Google 帳號登入
        </button>
      )}
    </div>
  );
}
