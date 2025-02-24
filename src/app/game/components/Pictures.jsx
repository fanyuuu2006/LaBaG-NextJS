import "@/styles/InfoSwal.css";
import P from "../backend/P";
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

const ModeMatchColors = {
  Normal: { background: "#000B52", border: "#FFFFFF" },
  SuperHHH: { background: "#310052", border: "#FF00FF" },
  GreenWei: { background: "#045200", border: "#00FF00" },
  PiKaChu: { background: "#6E5B07", border: "#FFFF00" },
};

export default function Pictures({ LCode, MCode, RCode, NowMode }) {
  const PicturesInfo = {
    QST: {
      title: "??????",
      picture: QSTs[NowMode],
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
    },
  };

  function InfoSwal(code) {
    const Info = PicturesInfo[code];
    const MatchColor = ModeMatchColors[NowMode];
    Swal.fire({
      title: Info.title,
      html:
        code === "QST"
          ? "<p><b>點進來做什麼?</b></p>"
          : `<p><b>一般模式機率: ${Info.rates["Normal"]}%<br>超級阿禾模式機率: ${Info.rates["SuperHHH"]}%</b></p>`,
      background: MatchColor.background, // 設定彈窗背景顏色
      color: "#FFFFFF", // 設定文字顏色
      imageUrl: Info.picture.src,
      customClass: {
        popup: "InfoSwal",
      },
      didOpen: () =>{
        document.querySelector(".InfoSwal").style.border = `3px solid ${MatchColor.border}`;
      },
      confirmButtonText: "關閉",
    });
  }
  return (
    <div className="Pictures">
      <Image
        src={PicturesInfo[LCode].picture}
        alt="Left Picture"
        onClick={() => {
          InfoSwal(LCode);
        }}
      />
      <Image
        src={PicturesInfo[MCode].picture}
        alt="Mid Picture"
        onClick={() => {
          InfoSwal(MCode);
        }}
      />
      <Image
        src={PicturesInfo[RCode].picture}
        alt="Right Picture"
        onClick={() => {
          InfoSwal(RCode);
        }}
      />
    </div>
  );
}
