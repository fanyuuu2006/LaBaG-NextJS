import { useNowMode } from "@/app/NowModeContext";
import { Game } from "@/lib/PlayLaBaG";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { DownloadJsonButton } from "./DownloadJsonButton";

export const GameOverSection = () => {
  const router = useRouter();
  const { setNowMode } = useNowMode();
  return (
    <section>
      <Space direction="vertical" align="center">
        <div
          className="Title"
          style={{
            color: "red",
            textShadow:
              "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white",
          }}
        >
          <b>遊戲結束！</b>
        </div>
        <div
          className="Label"
          style={{ color: "white" }}
        >{`最終分數為: ${Game.Score}`}</div>
        <Button
          size="large"
          className="Content"
          type="primary"
          onClick={() => {
            Game.Reset();
            setNowMode(Game.NowMode());
            router.push("./Game");
          }}
        >
          再玩一次
        </Button>
        <DownloadJsonButton/>
      </Space>
    </section>
  );
};
