import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <button className="LoginButton" onClick={() => signOut()}>登出</button>
        </>
      ) : (
        <button className="LoginButton" onClick={() => signIn("google")}>登入</button>
      )}
    </>
  );
}
