import P from "../backend/P";
import Game from "../backend/PlayLaBaG";
import Image from "next/image";
import Swal from "sweetalert2";

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
import pikachu from "@/assets/pikachu.jpg";

const QSTs = {
  Normal: QST,
  SuperHHH: SuperQST,
  GreenWei: GreenQST,
  PiKaChu: KachuQST,
};

export default function Pictures({ LP, MP, RP }) {
  const PicturesInfo = {
    QST: {
      title: "??????",
      picture: QSTs[Game.NowMode()],
    },
    A: {
      title: "咖波",
      rates: P.Obj["A"].rate_obj,
      picture: Gss,
    },
    B: {
      title: "阿禾",
      rates: P.Obj["B"].rate_obj,
      picture: Hhh,
    },
    C: {
      title: "猥褻男",
      rates: P.Obj["C"].rate_obj,
      picture: Hentai,
    },
    D: {
      title: "蚊傑",
      rates: P.Obj["D"].rate_obj,
      picture: Handsun,
    },
    E: {
      title: "皮卡丘",
      rates: P.Obj["E"].rate_obj,
      picture: Kachu,
    },
    F: {
      title: "館長",
      rates: P.Obj["F"].rate_obj,
      picture: Rrr,
    },
    SB: {
      title: "超級阿禾",
      rates: P.Obj["B"].rate_obj,
      picture: superhhh,
    },
    GW: {
      title: "綠光阿瑋",
      rates: P.Obj["A"].rate_obj,
      picture: greenwei,
    },
    PK: {
      title: "皮卡丘",
      rates: P.Obj["E"].rate_obj,
      picture: pikachu,
    }
  };

  function InfoSwal(code, src) {
    const Info = PicturesInfo[code];
    Swal.fire({
      title: Info.title,
      text:
        code === "QST"
          ? "點進來做什麼?"
          : `一般機率: ${Info.rates["Normal"]}\n超級阿禾模式機率: ${Info.rates["SuperHHH"]}\n`,
      icon: src,
    });
  }
  return (
    <div className="Pictures">
      <Image src={LP} alt="Left Picture" />
      <Image src={MP} alt="Mid Picture" />
      <Image src={RP} alt="Right Picture" />
    </div>
  );
}
