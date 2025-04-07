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
import { Button, ButtonProps } from "antd";
import { useNowMode } from "./NowModeContext";
import { ModeNames } from "labag";

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
    // 才會被執行
    if (bgmRunning) {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicSources[NowMode]);
        audioRef.current.loop = true;
      }

      if (audioRef.current.src !== musicSources[NowMode]) {
        audioRef.current.src = musicSources[NowMode];
        audioRef.current.load(); // 確保新音樂載入
      }
      setTimeout(() => {
        audioRef.current
          ?.play()
          .catch((err) => console.error("播放音樂錯誤:", err));
      }, 100);
    }

    return () => {
      //這都會先被執行
      audioRef.current?.pause();
      audioRef.current = null; // 清理音樂物件，避免記憶體洩漏
    };
  }, [bgmRunning, NowMode]);

  const MusicButton = (props: Omit<ButtonProps, "onClick" | "children">) => {
    const { style, ...rest } = props;
    return (
      <Button
      onClick={() => {
        console.log(`音樂${!bgmRunning ? "開啟" : "關閉"}`);
        setBgmRunning(!bgmRunning);
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
        {...rest}
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
