import { useNowMode } from "@/context/NowModeContext";
import { ModeColors } from "@/utils/ModeColors";

export type ModeBorderCardProps = React.HTMLAttributes<HTMLDivElement>;

export const ModeBorderCard: React.FC<ModeBorderCardProps> = (
  props: ModeBorderCardProps
) => {
  const { style, ...rest } = props;
  const { NowMode } = useNowMode();
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
        border: `${ModeColors[NowMode].dark} solid 3px`,
        borderRadius: "10px",
        ...style,
      }}
      {...rest}
    ></div>
  );
};
