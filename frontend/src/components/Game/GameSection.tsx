import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CodePicture } from "./CodePicture";
import { InfoText } from "./InfoText";
import { PopPicture } from "./PopPicture";

import BG from "@/assets/BG.jpg";
import SuperBG from "@/assets/SuperBG.jpg";
import GreenBG from "@/assets/GreenBG.jpg";
import KachuBG from "@/assets/KachuBG.jpg";
import { StaticImageData } from "next/image";
import { Toast } from "../common/Alert";
import { useNowMode } from "@/context/NowModeContext";
import { RuleButton } from "./RuleButton";
import { useMusic } from "@/context/MusicContext";
import { useUser } from "../../context/UserContext";
import { CoolDownButton } from "../common/CoolDownButton";
import ModeColors from "@/json/ModeColors.json";
import { ModeNames, Modes } from "labag";
import { Game } from "@/utils/game";

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
  const { User } = useUser();
  const { NowMode, setNowMode } = useNowMode();
  const router = useRouter();
  const { MusicButton, setBgmRunning } = useMusic();

  useEffect(() => {
    console.log(Game);
    setBgmRunning(true);
    console.log("背景音樂開始播放");
    return () => {
      setBgmRunning(false);
      console.log("背景音樂停止播放");
    };
  }, [setBgmRunning]);

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
          setCode(Game.Ps[i]?.code ?? "QST");
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
            if (Game.Ps[i]?.code === "B") {
              setCodes[i]("SB");
            }
          }
          Sound("/audio/SuperUP.mp3");
          break;
        case "GreenWei":
          if (Game.Ps.some((p) => p?.code === "A")) {
            setCodes.forEach((setCode, i) => {
              if (Game.Ps[i]?.code === "A") {
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
            if (Game.Ps[i]?.code === "E") {
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
          if (User)
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ score: Game.Score }),
            })
              .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
              })
              .catch((err) => {
                Toast.fire({
                  icon: "error",
                  title: "上傳記錄失敗",
                  text: err.message,
                });
              });

          Sound("/audio/Ding.mp3");
          router.replace("./GameOver");
        }
        if (Game.NowMode() !== "Normal" && Game.ModeToScreen) {
          PopPicture(Game.NowMode() as Exclude<ModeNames, "Normal">);
        }
      }, 3500);
    }
  };

  return (
    <section style={{ height: "100%" }}>
      <CodePicture LCode={LCode} MCode={MCode} RCode={RCode} />
      <InfoText
        Score={Score}
        MarginScore={MarginScore}
        DoubleScore={DoubleScore}
        RestTimes={RestTimes}
        ModeTimes={ModeTimes}
        GssNum={GssNum}
      />
      <CoolDownButton
        className="Content"
        onClick={Begin}
        enabledStyle={{
          backgroundColor: "#FFFFFF",
          borderColor: ModeColors[NowMode].light,
          color: ModeColors[NowMode].dark,
        }}
        disabledStyle={{
          backgroundColor: "#787878",
          borderColor: "#000000",
          color: "#000000",
        }}
      >
        開始
      </CoolDownButton>
      <MusicButton
        className="Note"
        style={{ position: "fixed", bottom: "0.5em", right: "0.5em" }}
      />
      <RuleButton />
    </section>
  );
};
