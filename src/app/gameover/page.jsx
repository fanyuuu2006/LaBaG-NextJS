"use client";
import TopBar from "../components/TopBar";
import AgainButton from "@/app/components/AgainButton";
import GameoverText from "@/app/components/GameoverText";
import DownloadJson from "@/app/components/DownloadJson";
import Links from "../components/Links";

export default function GameOverPage() {
  return (
    <>
      <TopBar />
      <div className="Screen">
        <GameoverText />
        <AgainButton />
        <DownloadJson />
      </div>
      <Links/>
    </>
  );
}
