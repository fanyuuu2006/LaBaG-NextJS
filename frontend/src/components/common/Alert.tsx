import Swal from "sweetalert2";
import "@/style/Alert.css";
import { useState } from "react";
import React from "react";

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
export interface ContainerProps
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "style" | "onClick"> {
  direction?: "horizon" | "vertical";
  mainAlign?: alignOption;
  crossAlign?: alignOption;
}

const crossAlignMap: Record<alignOption, React.CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

const mainAlignMap: Record<alignOption, React.CSSProperties["justifyContent"]> =
  {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  };

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
      children,
      ...rest
    } = props;

    const flexDirection = direction === "horizon" ? "row" : "column";

    const clonedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          if ((child as React.JSX.Element).props.onClick) {
            (child as React.JSX.Element).props.onClick(e);
          }
        },
      } as React.ComponentPropsWithoutRef<"div">);
    });

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
          flexDirection,
          alignItems: crossAlignMap[crossAlign],
          justifyContent: mainAlignMap[mainAlign],
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
