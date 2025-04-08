import { useRouter } from "next/navigation";
import { Button, Space, Tooltip } from "antd";
import Image from "next/image";
import SuperCircle from "@/assets/SuperCircle.png";
import { useNowMode } from "@/context/NowModeContext";
import ModeColors from "@/json/ModeColors.json";
import { Game } from "@/utils/game";
import { InstallPWAButton } from "./InstallPWAButton";

export const HomeSection = () => {
  const router = useRouter();
  const { NowMode, setNowMode } = useNowMode();
  return (
    <section style={{ height: "100%" }}>
      <Space
        direction="vertical"
        align="center"
        size={"large"}
      >
        <Image priority src={SuperCircle} alt="SuperCircle" />
        <Tooltip title="點擊進入遊戲">
          <Button
            type="text"
            className="Label"
            style={{
              backgroundColor: "rgba(0, 0 ,0, 0.5)",
              color: "#FFFFFF",
              border: `${ModeColors[NowMode].dark} solid 3px`,
              padding: "1em",
            }}
            onClick={() => {
              Game.Reset();
              setNowMode(Game.NowMode());
              router.push("./Game");
            }}
          >
            進入遊戲
          </Button>
        </Tooltip>
        <InstallPWAButton />
      </Space>
    </section>
  );
};
