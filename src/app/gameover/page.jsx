"use client";
import AgainButton from "./components/AgainButton";
import InfoText from "./components/InfoText";
import DownloadJson from "./components/DownloadJson";

export default function GameOverPage() {
  return (
    <div className="Screen">
      <InfoText/>
      <AgainButton />
      <DownloadJson/>
    </div>
  );
}
