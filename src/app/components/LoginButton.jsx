import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div className="LoginButton" >
      {session ? (
        <>
          <button onClick={() => signOut()}>登出</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>登入</button>
      )}
    </div>
  );
}
