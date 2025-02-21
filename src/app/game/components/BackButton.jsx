import Image from "next/image";
import { useRouter } from "next/navigation";
import back from "@/assets/back.jpg";

export default function BackButton() {
  const router = useRouter();

  return (
    <Image
      src={back}
      alt="返回按鈕"
      onClick={() => {
        router.push("/");
        console.log("切換至 Index 畫面");
      }}
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
