import { useRouter } from "next/navigation";
import { Button, Space } from "antd";
import Image from "next/image";
import SuperCircle from "@/assets/SuperCircle.png";
import { useNowMode } from "@/context/NowModeContext";
import { Game } from "@/utils/game";
import { InstallPWAButton } from "./InstallPWAButton";
import { ModeColors } from "@/utils/ModeColors";
import { StateStylesComponent } from "fanyucomponents";

export const HomeSection = () => {
  const router = useRouter();
  const { NowMode, setNowMode } = useNowMode();

  return (
    <section style={{ height: "100%" }}>
      <Space direction="vertical" align="center" size={"large"}>
        <Image priority src={SuperCircle} alt="SuperCircle" />
        <StateStylesComponent
          as={Button}
          type="text"
          className="Label"
          style={{
            backgroundColor: "rgba(0, 0 ,0, 0.5)",
            color: "#FFFFFF",
            border: `${ModeColors[NowMode].dark} solid 3px`,
            padding: "1em",
          }}
          styles={{
            hover: {
              filter: `drop-shadow(0 0 5px ${ModeColors[NowMode].light})`,
            },
          }}
          onClick={() => {
            Game.Reset();
            setNowMode(Game.NowMode());
            router.push("./Game");
          }}
        >
          進入遊戲
        </StateStylesComponent>
        <InstallPWAButton />
      </Space>
    </section>
  );
};
