"use client";
import CirclePicture from "./components/CirclePicture";
import Links from "./components/Links";
export default function IndexPage() {
  return (
    <div className="Screen">
      <CirclePicture />
      <p
        style={{
          textAlign: "center",
          fontSize: "25px",
          color: "white",
        }}
      >
        <b>請點擊上方圖片進入遊戲</b>
      </p>
      <Links/>
    </div>
  );
}
