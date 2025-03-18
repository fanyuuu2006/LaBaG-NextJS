import { useRouter } from "next/navigation";
import { Space, Tooltip } from "antd";
import Image from "next/image";
import SuperCircle from "@/assets/SuperCircle.png";
import { Game } from "@/lib/PlayLaBaG";
import { useNowMode } from "@/app/NowModeContext";

export const HomeSection = () => {
  const router = useRouter();
  const { setNowMode } = useNowMode();
  return (
    <section>
      <Space
        className="Home-Div"
        direction="vertical"
        align="center"
        size={"large"}
      >
        <Tooltip title="進入遊戲">
          <Image
            priority
            onClick={() => {
              Game.Reset();
              setNowMode(Game.NowMode());
              router.push("./Game");
            }}
            src={SuperCircle}
            alt="SuperCircle"
          />
        </Tooltip>
        <div className="Label" style={{ color: "white" }}>
          點擊上方圖片進入遊戲
        </div>
      </Space>
    </section>
  );
};
