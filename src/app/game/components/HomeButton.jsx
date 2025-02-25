import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function HomeButton() {
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
    <FaHome
      onClick={DialogBox}
      title="返回首頁"
      size={30}
      color="#FFFFFF"
      style={{
        cursor: "pointer",
        position: "fixed",
        top: "10px" /* 距離視窗頂部 */,
        left: "10px" /* 距離視窗左邊 */,
        border: "3px solid white",
        borderRadius: "5px",
      }}
    />
  );
}
