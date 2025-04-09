import Swal from "sweetalert2";
import "@/style/Alert.css";
import React, { useState } from "react";

export const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "white",
  color: "#FFFFFF",
  customClass: {
    popup: "toast-color",
  },
});

export type alignOption = "start" | "center" | "end";

/**
 * ContainerProps 定義了 Modal 容器的配置屬性
 */
export interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * 指定 Modal 內容的排列方向
   * 可選值為 "horizon" 或 "vertical"
   * 默認為 "vertical"
   */
  direction?: "horizon" | "vertical";

  /**
   * 指定主軸對齊方式
   * 可選值為 "start", "center", "end"
   * 默認為 "center"
   */
  mainAlign?: alignOption;

  /**
   * 指定交叉軸對齊方式
   * 可選值為 "start", "center", "end"
   * 默認為 "center"
   */
  crossAlign?: alignOption;

  /**
   * 是否在點擊時停止事件冒泡，默認為 true
   */
  stopPropagation?: boolean;

  /**
   * 內嵌樣式
   */
  style?: React.CSSProperties;

  /**
   * 子元素，通常是組件或 DOM 元素
   */
  children?: React.ReactNode;
}

/**
 * flexAlignMap 定義了不同對齊選項對應的 CSS 屬性值
 */
const flexAlignMap = {
  main: {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  },
  cross: {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  },
} as const;

/**
 * useModal hook 用於控制模態框顯示與隱藏
 * @returns {Object} 返回打開、關閉、切換顯示狀態的函數，以及容器組件
 */

export const useModal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const Toggle = () => setIsShow((prev) => !prev);
  const Open = () => setIsShow(true);
  const Close = () => setIsShow(false);

  const Container = (props: ContainerProps) => {
    if (!isShow) return null;

    const {
      direction = "vertical",
      mainAlign = "center",
      crossAlign = "center",
      stopPropagation = true,
      children,
      style,
      ...rest
    } = props;

    const clonedChildren = React.Children.map(
      children,
      (child: React.ReactNode) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
              {
                onClick: (e: React.MouseEvent) => {
                  if (stopPropagation) e.stopPropagation();
                  (child as React.JSX.Element).props?.onClick?.(e);
                },
              }
            )
          : child
    );

    return (
      <div
        style={{
          zIndex: 1080,
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",

          display: "flex",
          flexDirection: direction === "horizon" ? "row" : "column",
          alignItems: flexAlignMap.cross[crossAlign],
          justifyContent: flexAlignMap.main[mainAlign],
          ...style,
        }}
        onClick={Close}
        {...rest}
      >
        {clonedChildren}
      </div>
    );
  };

  return {
    Open,
    Close,
    Toggle,
    Container,
    isShow,
  };
};
