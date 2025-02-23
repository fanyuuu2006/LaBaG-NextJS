"use client";
import AgainButton from "./components/AgainButton";
import InfoText from "./components/InfoText";
import ScoresPicture from "./components/ScoresPicture";

export default function GameOverPage() {
  return (
    <div className="Screen">
      <InfoText/>
      <AgainButton />
      <ScoresPicture/>
    </div>
  );
}
