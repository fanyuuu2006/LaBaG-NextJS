"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useRef,
  useEffect,
} from "react";
import { ModeNames } from "@/lib/Mode";
import { Button, ButtonProps } from "antd";
import { useNowMode } from "./NowModeContext";

const musicSources: Record<ModeNames, string> = {
  Normal: "/audio/Bgm.mp3",
  SuperHHH: "/audio/SuperMusic.mp3",
  GreenWei: "/audio/GreenMusic.mp3",
  PiKaChu: "/audio/KachuMusic.mp3",
};

const musicContext = createContext<
  | {
      MusicButton: React.FC<Omit<ButtonProps, "onClick" | "children">>;
      setBgmRunning: Dispatch<SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

// Provider 組件
export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [bgmRunning, setBgmRunning] = useState<boolean>(false);
  const { NowMode } = useNowMode();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (bgmRunning) {
      // 確保清理舊的音樂物件
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // 創建新的音樂對象
      const audio = new Audio(musicSources[NowMode]);
      audio.loop = true;
      audioRef.current = audio;

      // 嘗試播放音樂
      setTimeout(() => {
        audio.play().catch((err) => console.error("播放音樂錯誤:", err));
      }, 100);
    } else {
      audioRef.current?.pause();
      audioRef.current = null; // 清除引用，防止記憶體洩漏
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [bgmRunning, NowMode]);

  const MusicButton = (props: Omit<ButtonProps, "onClick" | "children">) => {
    const { style, ...rest } = props;
    return (
      <Button
        {...rest}
        onClick={() => {
          setBgmRunning(!bgmRunning);
          console.log(`音樂${bgmRunning ? "開啟" : "關閉"}`);
        }}
        style={{
          width: "2.5em",
          height: "2.5em",
          color: "black",
          borderRadius: "100%",
          cursor: "pointer",
          border: `3px solid ${bgmRunning ? "#006900" : "#696969"}`,
          backgroundColor: bgmRunning ? "#00FF00" : "#E0E0E0",
          ...style,
        }}
      >
        {bgmRunning ? "開" : "關"}
      </Button>
    );
  };

  return (
    <musicContext.Provider value={{ MusicButton, setBgmRunning }}>
      {children}
    </musicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(musicContext);
  if (!context) {
    throw new Error("useMusic 必須在 MusicProvider 內使用");
  }
  return context;
};
