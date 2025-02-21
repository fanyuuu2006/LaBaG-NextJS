"use client";
import { useState } from "react";
import Game from "./backend/PlayLaBaG";
import BackButton from "./components/BackButton";
import TitlePicture from "./components/TitlePicture";
import Pictures from "./components/Pictures";

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
  const [NowMode, setNowMode] = useState(Game.NowMode());

  return (
    <div className="GameScreen">
      <BackButton />
      <TitlePicture NowMode={NowMode} />
      <Pictures
      LP={QSTs[NowMode]}
      MP={QSTs[NowMode]}
      RP={QSTs[NowMode]}
      />
    </div>
  );
}
