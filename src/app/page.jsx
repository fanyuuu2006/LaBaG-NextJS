"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Game from "./game/backend/PlayLaBaG";
import SuperCircle from "@/assets/SuperCircle.png";

export default function IndexPage() {
  const router = useRouter();

  function IntoGame() {
    router.push("/game");
    console.log("切換至 Game 畫面");
    Game.Reset();
  }

  return (
    <div className="Screen">
      <Image
        src = {SuperCircle}
        alt = "SuperCircle"
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
    </div>
  );
}
