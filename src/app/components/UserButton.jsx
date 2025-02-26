import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserButton() {
  const { data: session } = useSession();

  return (
    <>
      <Image
        className="UserButton"
        src={session.user.image}
        width={40}
        height={40}
        alt="UserButton"
      />
    </>
  );
}
