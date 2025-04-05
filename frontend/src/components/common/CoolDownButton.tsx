import { Button, ButtonProps } from "antd";
import { useState } from "react";

export interface CoolDownButtonProps extends ButtonProps {
  coolDownTime?: number; // 冷卻時間
  enabledStyle?: React.CSSProperties; // 啟用時的樣式
  disabledStyle?: React.CSSProperties; // 禁用時的樣式
}

export const CoolDownButton = (props: CoolDownButtonProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);
  const { children, style, onClick, coolDownTime, enabledStyle, disabledStyle, ...rest } = props;

  const currentStyle = {
    padding: "1em 1.5em",
    ...style,
    ...(isButtonEnabled ? enabledStyle : disabledStyle),
  }

  return (
    <Button
      disabled={!isButtonEnabled}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        setIsButtonEnabled(false);
        onClick?.(e); // 如果有傳入 onClick 函數，則執行它
        setTimeout(() => {
          setIsButtonEnabled(true);
        }, coolDownTime ?? 1000);
      }}
      style={currentStyle}
      {...rest}
    >
      {children}
    </Button>
  );
};
