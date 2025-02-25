import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
            <Image
              src={session.user.image}
              width={40}
              height={40}
              style={{borderRadius: "100%", cursor: "pointer"}}
              alt="User Avatar"
            />
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
