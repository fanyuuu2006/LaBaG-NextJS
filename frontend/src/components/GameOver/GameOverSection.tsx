import { useNowMode } from "@/context/NowModeContext";
import { Game } from "@/lib/PlayLaBaG";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { DownloadJsonButton } from "./DownloadJsonButton";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export const GameOverSection = () => {
  const { User } = useUser();
  const router = useRouter();
  const { setNowMode } = useNowMode();
  const [historyScore, setHistoryScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!User) {
      setLoading(false);
      return;
    } // 若沒有 User 則不進行請求
    const fetchHistoryScore = async () => {
      const score = await User.historyScore();
      setHistoryScore(score);
      setLoading(false);
    };
    fetchHistoryScore();
  }, [User]);

  return (
    <section style={{ height: "100%" }}>
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
          最終分數為:{" "}
          <span className="Content">
            {Game.Score.toString().padStart(8, "\u00A0")}
          </span>
          <span className="Hint" style={{ color: "#FF3333" }}>
            {User && !loading && Game.Score > historyScore && "新紀錄"}
          </span>
        </div>
        <Button
          className="Note"
          style={{
            padding: "1em",
          }}
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
