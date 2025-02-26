"use client";
import HomeButton from "@/app/components/HomeButton";
import LoginButton from "@/app/components/LoginButton";
import AgainButton from "@/app/components/AgainButton";
import GameoverText from "@/app/components/GameoverText";
import DownloadJson from "@/app/components/DownloadJson";
import Links from "@/app/components/Links";

export default function GameOverPage() {
  return (
    <>
    <HomeButton/>
    <LoginButton/>
      <div className="Screen">
        <GameoverText />
        <AgainButton />
        <DownloadJson />
      </div>
      <Links/>
    </>
  );
}
