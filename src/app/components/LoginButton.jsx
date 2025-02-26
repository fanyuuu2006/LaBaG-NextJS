import { signIn, signOut, useSession } from "next-auth/react";
import UserButton from "./UserButton";
export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <p style={{ color: "#FFFFFF", fontWeight: "bold", left: 0 }}>載入中...</p>;

  return (
    <>
      {session ? (
        <>
          <div style={{ display: "flex", alignItems: "center", marginInline: "20px"}}>
            <button className="LoginButton" onClick={() => signOut()}>
              登出
            </button>
            <UserButton/>
          </div>
        </>
      ) : (
        <button className="LoginButton" onClick={() => signIn("google")}>
          登入
        </button>
      )}
    </>
  );
}
