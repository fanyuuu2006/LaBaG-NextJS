"use client";
import { Game } from "@/utils/game";
import { ModeNames } from "labag";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";


// 建立 Context (React 提供的 API，可以建立一個「全域的共享狀態」)
const NowModeContext = createContext<{
  NowMode: ModeNames;
  setNowMode: Dispatch<SetStateAction<ModeNames>>;
} | null>(null); // 初始值為 null（表示預設 Context 尚未提供值）

// Provider 組件
export const NowModeProvider = ({ children }: { children: ReactNode }) => {
  const [NowMode, setNowMode] = useState<ModeNames>(Game.NowMode());

  return (
    <NowModeContext.Provider value={{ NowMode, setNowMode }}>
      {children}
    </NowModeContext.Provider>
  );
};

// 建立 useNowMode Hook  讓組件可以存取 NowMode
export const useNowMode = () => {
  const context = useContext(NowModeContext);
  if (!context) {
    throw new Error("useNowMode 必須在 NowModeProvider 內使用");
  }
  return context;
};
