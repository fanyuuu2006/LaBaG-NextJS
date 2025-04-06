import Image, { StaticImageData } from "next/image";
import "@/style/Popover.css";
import { Popover, Space } from "antd";
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
import { useNowMode } from "@/context/NowModeContext";
import { ModeNames, Modes, P } from "labag";

const QSTs: Record<ModeNames, StaticImageData> = {
  Normal: QST,
  SuperHHH: SuperQST,
  GreenWei: GreenQST,
  PiKaChu: KachuQST,
};

export const CodePicture = ({
  LCode,
  MCode,
  RCode,
}: {
  LCode: string;
  MCode: string;
  RCode: string;
}) => {
  const { NowMode } = useNowMode();
  const Pictures: Record<
    string,
    { title: string; content: React.JSX.Element; picture: StaticImageData }
  > = {
    QST: {
      title: "??????",
      content: (
        <>
          <div>點進來做什麼?</div>
        </>
      ),
      picture: QSTs[NowMode],
    },
    A: {
      title: "咖波",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("A")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("A")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Gss,
    },
    B: {
      title: "阿禾",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("B")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("B")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Hhh,
    },
    C: {
      title: "猥褻男",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("C")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("C")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Hentai,
    },
    D: {
      title: "蚊傑",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("D")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("D")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Handsun,
    },
    E: {
      title: "皮卡丘",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("E")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("E")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Kachu,
    },
    F: {
      title: "館長",
      content: (
        <>
          <div>
            {`一般模式機率: ${P.Map.get("F")?.rates["Normal"]}%`}
            <br />
            {`超級阿禾模式機率: ${P.Map.get("F")?.rates["SuperHHH"]}%`}
          </div>
        </>
      ),

      picture: Rrr,
    },
    SB: {
      title: "超級阿禾",
      content: (
        <>
          <div>
            {`觸發條件：`}
            <br />
            {`出現任一阿禾的時候 ${Modes.SuperHHH.Rate}% 機率`}
          </div>
        </>
      ),

      picture: superhhh,
    },
    GW: {
      title: "綠光阿瑋",
      content: (
        <>
          <div>
            {`觸發條件`}
            <br />
            {`1. 出現全部咖波的時候 ${Modes.GreenWei.Rate}% 機率`}
            <br />
            {`2. 咖波累積數達到 20`}
          </div>
        </>
      ),

      picture: greenwei,
    },
    PK: {
      title: "皮卡丘充電",
      content: (
        <>
          <div>
            {`觸發條件：`}
            <br />
            {`剩餘次數即將歸零時 出現皮卡丘`}
          </div>
        </>
      ),

      picture: pikachu,
    },
  };

  return (
    <Space direction="horizontal" align="center" size={0}>
      {[LCode, MCode, RCode].map((code: string, index: number) => (
        <Popover
          key={index}
          content={
            <Space className="Hint" style={{ color: "white" }}>
              {Pictures[code].content}
            </Space>
          }
          title={
            <Space className="Note" style={{ color: "white" }}>
              {Pictures[code].title}
            </Space>
          }
          trigger="click" // 點擊觸發彈窗
          arrow={false}
          classNames={{ root: `custom-popover-${NowMode}` }}
          placement="bottom"
        >
          <Image
            key={index}
            style={{
              width: "100%",
              maxWidth: "150px",
              height: "auto",
              cursor: "pointer",
            }}
            src={Pictures[code].picture}
            alt={Pictures[code].title}
          />
        </Popover>
      ))}
    </Space>
  );
};
