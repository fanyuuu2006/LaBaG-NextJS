import { Button, ButtonProps } from "antd";
import ModeColors from "@/json/ModeColors.json";
import { useNowMode } from "@/app/NowModeContext";

interface BeginButtonProps extends ButtonProps {
  ButtonAble: boolean;
}

export const BeginButton = ({
  ButtonAble,
  ...props
}: BeginButtonProps) => {
  const { NowMode } = useNowMode();
  return (
    <Button
      disabled={!ButtonAble}
      className="Content"
      style={{
        padding: "1em",
        maxWidth: "150px",
        ...(ButtonAble
          ? {
              backgroundColor: "#FFFFFF",
              borderColor: ModeColors[NowMode].light,
              color: ModeColors[NowMode].dark,
            }
          : {
              backgroundColor: "#787878",
              borderColor: "#000000",
              color: "#000000",
            }),
      }}
      {...props}
    >
      開始
    </Button>
  );
};
