export default function InfoText({
  Score,
  Times,
  MarginScore,
  DoubleScore,
  GssNum,
  NowMode,
  ModeTimes,
}) {
  const ModeStyleText = {
    Normal: { Style: {}, Text: "" },
    SuperHHH: {
      Style: { color: "#FF00FF" },
      Text: `超級阿禾剩餘次數: ${ModeTimes}次`,
    },
    GreenWei: {
      Style: { color: "#00FF00" },
      Text: `綠光阿瑋剩餘次數: ${ModeTimes}次`,
    },
    PiKaChu: {
      Style: { color: "#FFFF00" },
      Text: `已觸發 ${ModeTimes} 次皮卡丘充電`,
    },
  };
  const { Style, Text } = ModeStyleText[NowMode] || ModeStyleText["Normal"];

  return (
    <div className="InfoText">
      {MarginScore !== 0 ? (
        <p style={{ color: "#FFFF00" }}>
          <b>{`+ ${MarginScore}`}</b>
          {DoubleScore !== 0 && (
            <b
              style={{ color: "#FFFF00", fontSize: "14px" }}
            >{` ( 超級阿禾加倍分: ${DoubleScore} )`}</b>
          )}
        </p>
      ) : (
        <p />
      )}
      <p>
        <b>目前分數: {Score}</b>
      </p>
      <p>
        <b>剩餘次數: {Times}</b>
      </p>
      <p style={{ color: "#00FFFF" }}>
        <b>咖波累積數: {GssNum}</b>
      </p>
      {ModeTimes !== 0 ? (
        <p style={Style}>
          <b>{Text}</b>
        </p>
      ) : (
        <p />
      )}
    </div>
  );
}
