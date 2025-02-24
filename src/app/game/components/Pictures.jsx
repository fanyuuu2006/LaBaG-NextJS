import "@/styles/InfoSwal.css";
import P from "@/app/game/backend/P";
import Game from "@/app/game/backend/PlayLaBaG";
import Image from "next/image";
import Swal from "sweetalert2";
import rawPicturesInfo from "@/json/PicturesInfo.json"; // 先匯入原始資料
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
      html: "<p><b>點進來做什麼??</b></p>",
      picture: QSTs[NowMode],
    },
    A: {
      title: "咖波",
      html: `<p><b>一般模式機率: ${P.Obj["A"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["A"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Gss,
    },
    B: {
      title: "阿禾",
      html: `<p><b>一般模式機率: ${P.Obj["B"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["B"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Hhh,
    },
    C: {
      title: "猥褻男",
      html: `<p><b>一般模式機率: ${P.Obj["C"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["C"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Hentai,
    },
    D: {
      title: "蚊傑",
      html: `<p><b>一般模式機率: ${P.Obj["D"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["D"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Handsun,
    },
    E: {
      title: "皮卡丘",
      html: `<p><b>一般模式機率: ${P.Obj["E"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["E"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Kachu,
    },
    F: {
      title: "館長",
      html: `<p><b>一般模式機率: ${P.Obj["F"].rate_obj["Normal"]}%<br>超級阿禾模式機率: ${P.Obj["F"].rate_obj["SuperHHH"]}%</b></p>`,
      picture: Rrr,
    },
    SB: {
      title: "超級阿禾",
      html: `<p><b>觸發條件：<br>出現任一阿禾的時候 ${Game.SuperRate}% 機率</b></p>`,
      picture: superhhh,
    },
    GW: {
      title: "綠光阿瑋",
      html: `<p><b>觸發條件：<br>1. 出現全部咖波的時候 ${Game.GreenRate}% 機率<br>2. 咖波累積數達到 20</b></p>`,
      picture: greenwei,
    },
    PK: {
      title: "皮卡丘充電",
      html: `<p><b>觸發條件：<br>剩餘次數即將歸零時 出現皮卡丘</b></p>`,
      picture: pikachu,
    },
  };

  function InfoSwal(code) {
    const Info = PicturesInfo[code];
    const MatchColor = ModeMatchColors[NowMode];
    Swal.fire({
      title: Info.title,
      html: Info.html,
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
