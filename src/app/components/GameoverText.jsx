import Game from "@/app/game/backend/PlayLaBaG";
export default function GameoverText() {
  return (
    <>
      <p
        style={{
          fontSize: "50px",
          color: "red",
          textShadow:
            "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white",
          margin: "0px",
        }}
      >
        <b>遊戲結束！</b>
      </p>
      <p style={{ fontSize: "25px", color: "white" }}>
        <b>{`最終分數為: ${Game.Score}`}</b>
      </p>
    </>
  );
}
