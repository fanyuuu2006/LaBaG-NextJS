import ModeColors from "@/json/ModeColors.json";
import { README } from "./README";
import { useNowMode } from "@/context/NowModeContext";

export const AboutSection = () => {
  const { NowMode } = useNowMode();
  return (
    <section>
      <div
        style={{
          textAlign: "justify",
          color: "white",
          padding: "1em 2em",
          marginTop: "3em",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: `${ModeColors[NowMode].dark} solid 3px`,
          borderRadius: "10px",
        }}
      >
        <README />
      </div>
    </section>
  );
};
