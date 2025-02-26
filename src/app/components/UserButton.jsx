import Image from "next/image";
import Swal from "sweetalert2";
import { createRoot } from "react-dom/client";
import { signOut, useSession } from "next-auth/react";
import "@/styles/UserSwal.css";

export default function UserButton() {
  const { data: session } = useSession();

  const OpenMenu = () => {
    Swal.fire({
      imageUrl: session?.user?.image,
      title: session?.user?.name,
      customClass: {
        popup: "UserSwal",
      },
      didOpen: (popup) => {
        const root = createRoot(popup.querySelector(".swal2-html-container"));
        root.render(
          <div>
            {session?.user?.email}<br/>
            <button
              onClick={() => signOut()}
              style={{
                width: "80%",
                padding: "10px",
                border: "1px solid rgb(144, 0, 0)",
                background: "rgb(252, 82, 82)",
                color: "white",
                margin: "10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              登出
            </button>
          </div>
        );
      },
      showConfirmButton: false, // 隱藏確認按鈕
      showCloseButton: true, // 顯示關閉按鈕
    });
  };

  return (
    <>
      {session ? (
        <Image
          onClick={OpenMenu}
          className="UserButton"
          src={session?.user?.image}
          width={40}
          height={40}
          alt="UserButton"
        />
      ) : (
        <></>
      )}
    </>
  );
}
