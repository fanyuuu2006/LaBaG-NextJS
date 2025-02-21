"use client";
import { useState, useEffect} from "react";
import Game from "./backend/PlayLaBaG";
import BackButton from "./components/BackButton";
import TitlePicture from "./components/TitlePicture";
import Pictures from "./components/Pictures";
import InfoText from "./components/InfoText";
import BeginButton from "./components/BeginButton";
import MusicButton from "./components/MusicButton";

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

export default function GamePage() {
  const [IsClient, setIsClient] = useState(false); // 用於確保只在客戶端處理音樂邏輯
  const [BgmRunning, setBgmRunning] = useState(false);
  // 設置只在客戶端時運行
  useEffect(() => {
    setIsClient(true);
    setBgmRunning(true);
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

  return (
    <div className="GameScreen">
      <BackButton />
      <TitlePicture NowMode={NowMode} />
      <Pictures LP={QSTs[NowMode]} MP={QSTs[NowMode]} RP={QSTs[NowMode]} />
      <InfoText
        Score={Score}
        Times={Times}
        MarginScore={MarginScore}
        DoubleScore={DoubleScore}
        GssNum={GssNum}
        NowMode={NowMode}
        ModeTimes={ModeTimes}
      />
      <BeginButton BeginFunc={() => {}} Able={ButtonAble} />
      <MusicButton
        IsClient = {IsClient}
        BgmRunning={BgmRunning}
        setBgmRunning={setBgmRunning}
        NowMode={NowMode}
      />
    </div>
  );
}
