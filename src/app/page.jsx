"use client";
import Game from "./game/backend/PlayLaBaG";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuperCircle from "@/assets/SuperCircle.png";
import MonthlyVisitors from "./components/MonthlyVisitor";

export default function IndexPage() {
  const router = useRouter();

  function IntoGame() {
    Game.Reset();
    router.push("/game");
    console.log("切換至 Game 畫面");
  }

  return (
    <div className="Screen">
      <Image
        src = {SuperCircle}
        alt = "SuperCircle"
        priority // 添加這行，告訴 Next.js 優先加載這張圖片
        onClick = {() => {IntoGame()}}
        style={{ cursor: "pointer" }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "25px",
          color: "white",
        }}
      >
        <b>請點擊上方圖片進入遊戲</b>
      </p>
      <MonthlyVisitors/>
    </div>
  );
}
