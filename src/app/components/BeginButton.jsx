import Image from "next/image";
import BeginPIC from "@/assets/BeginPIC.jpg"

export default function BeginButton({ BeginFunc, Able }) {
  return Able ? (
    <Image
      src={BeginPIC}
      alt="開始按鈕"
      onClick={() => {
        console.log("已按下開始");
        BeginFunc();
      }}
      style={{
        width: "150px",
        height: "50px",
        cursor: "pointer",
      }}
    />
  ) : (
    <Image
      src={BeginPIC}
      alt="開始按鈕"
      style={{
        width: "150px",
        height: "50px",
        filter: "grayscale(100%)",
      }}
    />
  );
}


