"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Game from "./backend/PlayLaBaG";
import Toast from "../Toast";
import BackButton from "./components/BackButton";
import TitlePicture from "./components/TitlePicture";
import Pictures from "./components/Pictures";
import InfoText from "./components/InfoText";
import BeginButton from "./components/BeginButton";
import PopPicture from "./components/PopPicture";
// 使用 dynamic import 禁用 SSR (伺服器端渲染)
import dynamic from "next/dynamic";
const MusicButton = dynamic(() => import("./components/MusicButton"), { 
  ssr: false, // 禁用伺服器端渲染
});


import BG from "@/assets/BG.jpg";
import SuperBG from "@/assets/SuperBG.jpg";
import GreenBG from "@/assets/GreenBG.jpg";
import KachuBG from "@/assets/KachuBG.jpg";

import QST from "@/assets/QST.jpg";
import SuperQST from "@/assets/SuperQST.jpg";
import GreenQST from "@/assets/GreenQST.jpg";
import KachuQST from "@/assets/KachuQST.jpg";

import Gss from "@/assets/Gss.jpg";
import Hhh from "@/assets/Hhh.jpg";
import Hentai from "@/assets/Hentai.jpg";
import Handsun from "@/assets/Handsun.jpg";
import Kachu from "@/assets/Kachu.jpg";
import Rrr from "@/assets/RRR.jpg";

import superhhh from "@/assets/super_hhh.jpg";
import greenwei from "@/assets/green_wei.jpg";
import GreenLeft from "@/assets/GreenLeft.jpg";
import GreenMid from "@/assets/GreenMid.jpg";
import GreenRight from "@/assets/GreenRight.jpg";
import pikachu from "@/assets/pikachu.jpg";

import Ding from "@/assets/Ding.mp3";
import SuperUP from "@/assets/SuperUP.mp3";
import GreenUP from "@/assets/GreenUP.mp3";

const BGs = {
  Normal: BG,
  SuperHHH: SuperBG,
  GreenWei: GreenBG,
  PiKaChu: KachuBG,
};

const QSTs = {
  Normal: QST,
  SuperHHH: SuperQST,
  GreenWei: GreenQST,
  PiKaChu: KachuQST,
};

const CodePictures = {
  A: Gss,
  B: Hhh,
  C: Hentai,
  D: Handsun,
  E: Kachu,
  F: Rrr,
};

function Sound(s) {
  const audio = new Audio(s);
  audio.play();
}

export default function GamePage() {
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

  const [LP, setLP] = useState(QST);
  const [MP, setMP] = useState(QST);
  const [RP, setRP] = useState(QST);
  const setPs = [setLP, setMP, setRP];
  const [Score, setScore] = useState(Game.Score);
  const [Times, setTimes] = useState(Game.Times - Game.Played);
  const [MarginScore, setMarginScore] = useState(Game.MarginScore);
  const [DoubleScore, setDoubleScore] = useState(Game.DoubleScore);
  const [GssNum, setGssNum] = useState(Game.GssNum);
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
      setPs.forEach((setP) => {
        setP(QSTs[Game.NowMode()]);
      });
      setMarginScore(0);
      setDoubleScore(0);
    };
    const change_picture_per500ms = () => {
      setPs.forEach((setP, i) => {
        setTimeout(() => {
          setP(CodePictures[Game.Ps[i].code]);
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
            if (Game.Ps[i].code == "B") {
              setPs[i](superhhh);
            }
          }
          Sound(SuperUP);
          break;
        case "GreenWei":
          if (Game.Ps.every((p) => p.code === "A")) {
            setLP(GreenLeft);
            setMP(GreenMid);
            setRP(GreenRight);
          } else if (Game.Ps.some((p) => p.code === "A")) {
            for (let i = 0; i < 3; i++) {
              if (Game.Ps[i].code == "A") {
                setPs[i](greenwei);
              }
            }
          } else {
            setPs.forEach((setP) => {
              setP(greenwei);
            });
          }
          Sound(GreenUP);
          break;
        case "PiKaChu":
          for (let i = 0; i < 3; i++) {
            if (Game.Ps[i].code == "E") {
              setPs[i](pikachu);
            }
          }
          break;
      }
    };
    const info_text = () => {
      setMarginScore(Game.MarginScore);
      setDoubleScore(Game.DoubleScore);
      setScore(Game.Score);
      setTimes(Game.Times - Game.Played);
      setGssNum(Game.GssNum);
      const Mode = Game.NowMode();
      switch (Mode) {
        case "SuperHHH":
          setModeTimes(Game.SuperTimes);
          break;
        case "GreenWei":
          setModeTimes(Game.GreenTimes);
          break;
        case "PiKaChu":
          setModeTimes(Game.KachuTimes);
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
    <div className="GameScreen">
      <BackButton />
      <TitlePicture NowMode={NowMode} />
      <Pictures LP={LP} MP={MP} RP={RP} />
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
  );
}
