"use client";
import LoginButton from "./components/LoginButton";
import CirclePicture from "./components/CirclePicture";
import Links from "./components/Links";
export default function IndexPage() {
  return (
    <>
      <LoginButton />
      <div className="Screen">
        <CirclePicture />
        <p
          style={{
            fontSize: "25px",
            color: "#FFFFFF",
          }}
        >
          <b>請點擊上方圖片進入遊戲</b>
        </p>
      </div>
      <Links />
    </>
  );
}
