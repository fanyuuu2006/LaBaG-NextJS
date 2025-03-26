import { useNowMode } from "@/context/NowModeContext";
import { ModeNames } from "@/lib/Mode";
import { Button } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const MusicSources: Record<ModeNames, string> = {
  Normal: "/audio/Bgm.mp3",
  SuperHHH: "/audio/SuperMusic.mp3",
  GreenWei: "/audio/GreenMusic.mp3",
  PiKaChu: "/audio/KachuMusic.mp3",
};

export const MusicButton = ({
  isClient,
  BgmRunning,
  setBgmRunning,
}: {
  isClient: boolean;
  BgmRunning: boolean;
  setBgmRunning: Dispatch<SetStateAction<boolean>>;
}) => {
  const { NowMode } = useNowMode();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isClient) return;

    if (BgmRunning) {
      audioRef.current = new Audio(MusicSources[NowMode]);
      audioRef.current.loop = true; // 讓音樂循環播放
      setTimeout(() => {
        audioRef.current
          ?.play()
          .catch((err) => console.error("播放音樂錯誤:", err));
      }, 100);
    }

    return () => {
      if (isClient) audioRef.current?.pause();
    };
  }, [BgmRunning, NowMode, isClient]); // 當 BgmRunning 或 NowMode 改變時執行

  return (
    isClient && (
      <Button
        onClick={() => {
          setBgmRunning(!BgmRunning);
        }}
        className="Note"
        style={{
          width: "2.5em",
          height: "2.5em",
          position: "fixed",
          bottom: "0.5em",
          right: "0.5em",
          color: "black",
          borderRadius: "100%",
          cursor: "pointer",
          border: `3px solid ${BgmRunning ? "#006900" : "#696969"}`,
          backgroundColor: BgmRunning ? "#00FF00" : "#E0E0E0",
        }}
      >
        {BgmRunning ? "開" : "關"}
      </Button>
    )
  );
};
