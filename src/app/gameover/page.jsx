"use client";
import HomeButton from "@/app/components/HomeButton";
import AgainButton from "@/app/components/AgainButton";
import GameoverText from "@/app/components/GameoverText";
import DownloadJson from "@/app/components/DownloadJson";

export default function GameOverPage() {
  return (
    <div className="Screen">
      <HomeButton/>
      <GameoverText/>
      <AgainButton />
      <DownloadJson/>
    </div>
  );
}
