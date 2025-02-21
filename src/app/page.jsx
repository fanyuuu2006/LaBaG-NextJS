"use client";

import Image from "next/image";
import SuperCircle from "@/assets/SuperCircle.png";
export default function Index() {

  function IntoGame() {
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
