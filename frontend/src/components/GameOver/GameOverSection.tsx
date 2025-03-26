import { useNowMode } from "@/context/NowModeContext";
import { Game } from "@/lib/PlayLaBaG";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { DownloadJsonButton } from "./DownloadJsonButton";
import { useUser } from "@/context/UserContext";

export const GameOverSection = () => {
  const { User } = useUser();
  const router = useRouter();
  const { setNowMode } = useNowMode();
  return (
    <section>
      <Space direction="vertical" align="center" size="middle">
        <div
          className="Title"
          style={{
            color: "red",
          }}
        >
          遊戲結束！
        </div>
        <div
          className="Note"
          style={{
            color: "white",
            display: "flex",
            alignItems: "end",
            gap: "5px",
          }}
        >
          最終分數為: <span className="Content">{Game.Score}</span>
          <span className="Hint" style={{ color: "#FF3333" }}>
            {User && Game.Score > User.historyScore() && "新紀錄"}
          </span>
        </div>
        <Button
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
      </Space>
      <DownloadJsonButton />
    </section>
  );
};
