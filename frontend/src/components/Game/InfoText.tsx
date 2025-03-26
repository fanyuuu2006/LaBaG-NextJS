import { Space } from "antd";
import ModeColors from "@/json/ModeColors.json";
import { ModeNames } from "@/lib/Mode";
import { useNowMode } from "@/context/NowModeContext";

export const InfoText = ({
  Score,
  MarginScore,
  DoubleScore,
  RestTimes,
  GssNum,
  ModeTimes,
}: {
  Score: number;
  MarginScore: number;
  DoubleScore: number;
  RestTimes: number;
  GssNum: number;
  ModeTimes: number | null;
}) => {
  const { NowMode } = useNowMode();

  const ModeText: Record<ModeNames, string> = {
    Normal: "",
    SuperHHH: `超級阿禾剩餘次數: ${ModeTimes}次`,

    GreenWei: `綠光阿瑋剩餘次數: ${ModeTimes}次`,

    PiKaChu: `已觸發 ${ModeTimes} 次皮卡丘充電`,
  };

  return (
    <Space
      className="Note"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "5%",
        padding: "0.5em 3em",
      }}
      direction="vertical"
      align="center"
      size={0}
    >
      <div style={{ color: "#fffb00", height: "1.5em" }}>
        {MarginScore !== 0
          ? DoubleScore !== 0
            ? `+ ${MarginScore}(${DoubleScore})`
            : `+ ${MarginScore}`
          : ""}
      </div>
      <div style={{ color: "#FFFFFF" }}>目前分數: {Score}</div>
      <div style={{ color: "#FFFFFF" }}>剩餘次數: {RestTimes}</div>
      <div style={{ color: ModeColors.GreenWei.light }}>
        咖波累積數: {GssNum}
      </div>
      <div style={{ color: ModeColors[NowMode].light, height: "1.5em" }}>
        {ModeText[NowMode]}
      </div>
    </Space>
  );
};
