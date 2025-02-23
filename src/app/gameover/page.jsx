"use client";
import AgainButton from "./components/AgainButton";
import InfoText from "./components/InfoText";

export default function GameOverPage() {
  return (
    <div className="Screen">
      <InfoText/>
      <AgainButton />
    </div>
  );
}
