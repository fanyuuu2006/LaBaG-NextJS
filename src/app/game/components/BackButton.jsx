import Image from "next/image";
import { useRouter } from "next/navigation";
import back from "@/assets/back.jpg";
import Swal from "sweetalert2";

export default function BackButton() {
  const router = useRouter();
  const DialogBox = ()  => {
    Swal.fire({
      title: "確認是否返回首頁？",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EA0000",
      cancelButtonColor: "#0055d6",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
        console.log("切換至 Index 畫面");
      }
    });
  }

  return (
    <Image
      src={back}
      alt="返回按鈕"
      onClick={DialogBox}
      style={{
        cursor: "pointer",
        border: "3px solid white",
        position: "fixed",
        top: "10px" /* 距離視窗頂部 */,
        left: "10px" /* 距離視窗左邊 */,
        width: "30px",
        height: "30px",
        borderRadius: "5px",
      }}
    />
  );
}
