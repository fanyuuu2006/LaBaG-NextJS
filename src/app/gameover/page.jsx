"use client";
import UserButton from "../components/UserButton";
import AgainButton from "@/app/components/AgainButton";
import GameoverText from "@/app/components/GameoverText";
import DownloadJson from "@/app/components/DownloadJson";
import Links from "../components/Links";

export default function GameOverPage() {
  return (
    <>
    <UserButton/>
      <div className="Screen">
        <GameoverText />
        <AgainButton />
        <DownloadJson />
      </div>
      <Links/>
    </>
  );
}
