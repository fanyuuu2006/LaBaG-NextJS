import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <p style={{ color: "#FFFFFF", fontWeight: "bold", left: 0 }}>載入中...</p>
    );

  return (
    <>
      {session ? (
        <>
          <p
            style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: "bold" }}
          >{`歡迎，${session?.user?.name}！`}</p>
        </>
      ) : (
        <button className="LoginButton" onClick={() => signIn("google")}>
          <FcGoogle
            style={{ backgroundColor: "#FFFFFF", borderRadius: "100%" }}
          />{" "}
          使用 Google 帳號登入
        </button>
      )}
    </>
  );
}
