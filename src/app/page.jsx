"use client";
import UserButton from "./components/UserButton";
import LoginButton from "./components/LoginButton";
import CirclePicture from "./components/CirclePicture";
import Links from "./components/Links";
export default function IndexPage() {
  return (
    <>
    <UserButton/>
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
          <LoginButton/>
      </div>
      <Links />
    </>
  );
}
