"use client";
import AgainButton from "../components/AgainButton";
import GameoverText from "../components/GameoverText";
import DownloadJson from "../components/DownloadJson";

export default function GameOverPage() {
  return (
    <div className="Screen">
      <GameoverText/>
      <AgainButton />
      <DownloadJson/>
    </div>
  );
}
