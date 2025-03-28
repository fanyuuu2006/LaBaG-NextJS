import { Game } from "@/lib/PlayLaBaG";
import { ModeNames, Modes } from "@/lib/Mode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CodePicture } from "./CodePicture";
import { BeginButton } from "./BeginButton";
import { InfoText } from "./InfoText";
import { PopPicture } from "./PopPicture";
// 使用 dynamic import 禁用 SSR (伺服器端渲染)
import dynamic from "next/dynamic";
const MusicButton = dynamic(
  () => import("@/components/Game/MusicButton").then((mod) => mod.MusicButton),
  {
    ssr: false, // 禁用伺服器端渲染
  }
);

import BG from "@/assets/BG.jpg";
import SuperBG from "@/assets/SuperBG.jpg";
import GreenBG from "@/assets/GreenBG.jpg";
import KachuBG from "@/assets/KachuBG.jpg";
import { StaticImageData } from "next/image";
import { Toast } from "../common/Alert";
import { CommitScore } from "@/utils/CommitScore";
import { useNowMode } from "@/context/NowModeContext";
import { RuleButton } from "./RuleButton";

const BGs: Record<ModeNames, StaticImageData> = {
  Normal: BG,
  SuperHHH: SuperBG,
  GreenWei: GreenBG,
  PiKaChu: KachuBG,
};

function Sound(src: string) {
  const audio = new Audio(src);
  audio.play();
}

export const GameSection = () => {
  const { NowMode, setNowMode } = useNowMode();
  const router = useRouter();
  const [isClient, setisClient] = useState(false); // 用於確保只在客戶端處理邏輯
  const [BgmRunning, setBgmRunning] = useState<boolean>(false);
  const [ButtonAble, setButtonAble] = useState<boolean>(true);

  // 設置只在客戶端載入頁面時運行
  useEffect(() => {
    setisClient(true);
    setBgmRunning(true);

    return () => {
      setisClient(false);
      setBgmRunning(false);
    };
  }, []);

  const [LCode, setLCode] = useState<string>("QST");
  const [MCode, setMCode] = useState<string>("QST");
  const [RCode, setRCode] = useState<string>("QST");
  const setCodes = [setLCode, setMCode, setRCode];

  const [Score, setScore] = useState<number>(Game.Score);
  const [MarginScore, setMarginScore] = useState<number>(Game.MarginScore);
  const [DoubleScore, setDoubleScore] = useState<number>(
    Modes.SuperHHH?.Score ?? 0
  );
  const [RestTimes, setRestTimes] = useState<number>(Game.Times - Game.Played);
  const [ModeTimes, setModeTimes] = useState<number | null>(null);
  const [GssNum, setGssNum] = useState<number>(Modes.GreenWei?.Score ?? 0);

  // 使用 useEffect 來更新背景
  useEffect(() => {
    // document.body.style.backgroundImage 不會自動處理.src
    const NewBG = BGs[NowMode].src;
    document.body.style.backgroundImage = `url(${NewBG})`;
    console.log(`更換背景: ${NewBG}`);
  }, [NowMode]); // 當 NowMode 改變時，執行 useEffect

  const Begin = (): void => {
    const reset_qst_and_marginscore = (): void => {
      setCodes.forEach((setCode) => {
        setCode("QST");
      });
      setMarginScore(0);
      setDoubleScore(0);
    };
    const change_picture_per500ms = (): void => {
      setCodes.forEach((setCode, i) => {
        setTimeout(() => {
          setCode(Game.Ps[i]?.Code ?? "QST");
          console.log(`更新位置 ${i} 的圖片`);
          Sound("/audio/Ding.mp3");
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
            if (Game.Ps[i]?.Code === "B") {
              setCodes[i]("SB");
            }
          }
          Sound("/audio/SuperUP.mp3");
          break;
        case "GreenWei":
          if (Game.Ps.some((p) => p?.Code === "A")) {
            setCodes.forEach((setCode, i) => {
              if (Game.Ps[i]?.Code === "A") {
                setCode("GW");
              }
            });
          } else
            setCodes.forEach((setCode) => {
              setCode("GW");
            });

          Sound("/audio/GreenUP.mp3");
          break;
        case "PiKaChu":
          for (let i = 0; i < 3; i++) {
            if (Game.Ps[i]?.Code === "E") {
              setCodes[i]("PK");
            }
          }
          break;
      }
    };
    const info_text = () => {
      {
      }
      setMarginScore(Game.MarginScore);
      setDoubleScore(Modes?.SuperHHH?.Score ?? 0);
      setScore(Game.Score);
      setRestTimes(Game.Times - Game.Played);
      setGssNum(Modes.GreenWei?.Score ?? 0);
      const Mode = Game.NowMode();
      switch (Mode) {
        case "SuperHHH":
          setModeTimes(Modes.SuperHHH?.Times ?? 0);
          break;
        case "GreenWei":
          setModeTimes(Modes.GreenWei?.Times ?? 0);
          break;
        case "PiKaChu":
          setModeTimes(Modes.PiKaChu?.Times ?? 0);
          break;
      }
    };
    // 主要執行區段
    setButtonAble(false);
    if (!Game.GameRunning()) {
      Toast.fire({
        icon: "warning",
        title: "遊戲已結束",
      });
      Sound("/audio/Ding.mp3");
      router.replace("./GameOver");
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

      setTimeout(() => {
        if (!Game.GameRunning()) {
          CommitScore({
            Score: Game.Score,
            JsonData: Game.AllData,
          });
          Sound("/audio/Ding.mp3");
          router.replace("./GameOver");
        }
        if (Game.NowMode() !== "Normal" && Game.ModeToScreen) {
          PopPicture(Game.NowMode());
        }
        setButtonAble(true);
      }, 3500);
    }
  };

  return (
    <section>
      <CodePicture LCode={LCode} MCode={MCode} RCode={RCode} />
      <InfoText
        Score={Score}
        MarginScore={MarginScore}
        DoubleScore={DoubleScore}
        RestTimes={RestTimes}
        ModeTimes={ModeTimes}
        GssNum={GssNum}
      />
      <BeginButton onClick={Begin} ButtonAble={ButtonAble} />
      <MusicButton
        isClient={isClient}
        BgmRunning={BgmRunning}
        setBgmRunning={setBgmRunning}
      />
      <RuleButton />
    </section>
  );
};
