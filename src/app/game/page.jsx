"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {Game} from "./backend/PlayLaBaG";
import { Modes } from "./backend/Mode";
import Toast from "../Toast";
import LoginButton from "@/app/components/LoginButton";
import HomeButton from "@/app/components/HomeButton";
import TitlePicture from "@/app/components/TitlePicture";
import Pictures from "@/app/components/Pictures";
import InfoText from "@/app/components/InfoText";
import BeginButton from "@/app/components/BeginButton";
import PopPicture from "@/app/components/PopPicture";
import RuleButton from "@/app/components/RuleButton";
// 使用 dynamic import 禁用 SSR (伺服器端渲染)
import dynamic from "next/dynamic";
const MusicButton = dynamic(() => import("@/app/components/MusicButton"), {
  ssr: false, // 禁用伺服器端渲染
});

import BG from "@/assets/BG.jpg";
import SuperBG from "@/assets/SuperBG.jpg";
import GreenBG from "@/assets/GreenBG.jpg";
import KachuBG from "@/assets/KachuBG.jpg";

import Ding from "@/assets/Ding.mp3";
import SuperUP from "@/assets/SuperUP.mp3";
import GreenUP from "@/assets/GreenUP.mp3";

const BGs = {
  Normal: BG,
  SuperHHH: SuperBG,
  GreenWei: GreenBG,
  PiKaChu: KachuBG,
};

function Sound(s) {
  const audio = new Audio(s);
  audio.play();
}

async function CommitScore(Name, Score) {
  if (Name && Score) {
    try {
      const response = await fetch("/api/CommitScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, Score }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("無法提交分數:", error);
    }
  }
}

export default function GamePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [IsClient, setIsClient] = useState(false); // 用於確保只在客戶端處理邏輯
  const [BgmRunning, setBgmRunning] = useState(false);

  // 設置只在客戶端載入頁面時運行
  useEffect(() => {
    setIsClient(true);
    setBgmRunning(true);

    return () => {
      setIsClient(false);
      setBgmRunning(false);
    };
  }, []);

  const [ButtonAble, setButtonAble] = useState(true);
  const [NowMode, setNowMode] = useState(Game.NowMode());

  const [LCode, setLCode] = useState("QST");
  const [MCode, setMCode] = useState("QST");
  const [RCode, setRCode] = useState("QST");
  const setCodes = [setLCode, setMCode, setRCode];
  const [Score, setScore] = useState(Game.Score);
  const [Times, setTimes] = useState(Game.Times - Game.Played);
  const [MarginScore, setMarginScore] = useState(Game.MarginScore);
  const [DoubleScore, setDoubleScore] = useState(Modes.SuperHHH.Score);
  const [GssNum, setGssNum] = useState(Modes.GreenWei.Score);
  const [ModeTimes, setModeTimes] = useState(0);

  // **使用 useEffect 來更新背景**
  useEffect(() => {
    // document.body.style.backgroundImage 不會自動處理.src
    const NewBG = BGs[NowMode].src;
    document.body.style.backgroundImage = `url(${NewBG})`;
    console.log(`更換背景: ${NewBG}`);
  }, [NowMode]); // **當 NowMode 改變時，執行 useEffect**

  function Begin() {
    const reset_qst_and_marginscore = () => {
      setCodes.forEach((setCode) => {
        setCode("QST");
      });
      setMarginScore(0);
      setDoubleScore(0);
    };
    const change_picture_per500ms = () => {
      setCodes.forEach((setCode, i) => {
        setTimeout(() => {
          setCode(Game.Ps[i].Code);
          console.log(`更新位置 ${i} 的圖片`);
          Sound(Ding);
        }, 500 * (i + 1));
      });
    };
    const mode_picture_and_sound = () => {
      const mode = Game.NowMode();
      switch (mode) {
        case "Normal":
          break;
        case "SuperHHH":
          for (let i = 0; i < 3; i++) {
            if (Game.Ps[i].Code == "B") {
              setCodes[i]("SB");
            }
          }
          Sound(SuperUP);
          break;
        case "GreenWei":
          for (let i = 0; i < 3; i++) {
            if (Game.Ps[i].Code == "A") {
              setCodes[i]("GW");
            }
          }
          Sound(GreenUP);
          break;
        case "PiKaChu":
          for (let i = 0; i < 3; i++) {
            if (Game.Ps[i].Code == "E") {
              setCodes[i]("PK");
            }
          }
          break;
      }
    };
    const info_text = () => {
      setMarginScore(Game.MarginScore);
      setDoubleScore(Modes.SuperHHH.Score);
      setScore(Game.Score);
      setTimes(Game.Times - Game.Played);
      setGssNum(Modes.GreenWei.Score);
      const Mode = Game.NowMode();
      switch (Mode) {
        case "SuperHHH":
          setModeTimes(Modes.SuperHHH.Times);
          break;
        case "GreenWei":
          setModeTimes(Modes.GreenWei.Times);
          break;
        case "PiKaChu":
          setModeTimes(Modes.PiKaChu.Times);
          break;
      }
    };

    // 主要執行階段
    setButtonAble(false);
    if (!Game.GameRunning()) {
      // 如果遊戲已結束仍按下按鈕
      Toast.fire({
        icon: "warning",
        title: "遊戲已結束",
      });
    } else {
      reset_qst_and_marginscore();
      Game.Logic();
      change_picture_per500ms();

      setTimeout(() => {
        if (Game.NowMode() !== NowMode) {
          setNowMode(Game.NowMode());
        }
        info_text();
        if (Game.ModeToScreen) {
          mode_picture_and_sound();
        }
      }, 3000);
    }
    setTimeout(() => {
      if (!Game.GameRunning()) {
        setBgmRunning(false);
        CommitScore(session?.user?.name || null, Game.Score);
        router.push("/gameover");
        Sound(Ding);
      }
      if (Game.NowMode() !== "Normal" && Game.ModeToScreen) {
        PopPicture(Game.NowMode());
      }
      setButtonAble(true);
    }, 3500);
  }

  return (
    <>
      <LoginButton />
      <div className="GameScreen">
        <HomeButton />
        <RuleButton />
        <TitlePicture NowMode={NowMode} />
        <Pictures LCode={LCode} MCode={MCode} RCode={RCode} NowMode={NowMode} />
        <InfoText
          Score={Score}
          Times={Times}
          MarginScore={MarginScore}
          DoubleScore={DoubleScore}
          GssNum={GssNum}
          NowMode={NowMode}
          ModeTimes={ModeTimes}
        />
        <BeginButton BeginFunc={Begin} Able={ButtonAble} />
        <MusicButton
          IsClient={IsClient}
          BgmRunning={BgmRunning}
          setBgmRunning={setBgmRunning}
          NowMode={NowMode}
        />
      </div>
    </>
  );
}
