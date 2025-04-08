import Swal from "sweetalert2";
import "@/style/Alert.css";
import React, { useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

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
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "onClick"> {
  direction?: "horizon" | "vertical";
  mainAlign?: alignOption;
  crossAlign?: alignOption;
}

const crossAlignMap: Record<alignOption, React.CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;

const mainAlignMap: Record<alignOption, React.CSSProperties["justifyContent"]> =
  {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  } as const;

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
      style,
      ...rest
    } = props;

    const clonedChildren = React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
              (child as React.JSX.Element).props?.onClick?.(e);
            },
          } as React.ComponentPropsWithoutRef<"div">)
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
          alignItems: crossAlignMap[crossAlign],
          justifyContent: mainAlignMap[mainAlign],
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

export type ToastOptions = {
  time?: number;
  type: "success" | "error" | "warning" | "info";
  message: string;
  customClassName?: string;
  customStyle?: React.CSSProperties;
};

const ToastTypeStyle: Record<
  ToastOptions["type"],
  { icon: React.ReactNode; style: React.CSSProperties }
> = {
  success: {
    icon: <CheckCircleOutlined />,
    style: { backgroundColor: "#17c600" },
  },
  error: {
    icon: <CloseCircleOutlined />,
    style: { backgroundColor: "#ff3300" },
  },
  warning: {
    icon: <ExclamationCircleOutlined />,
    style: { backgroundColor: "#f18b0f" },
  },
  info: { icon: <InfoCircleOutlined />, style: { backgroundColor: "#005fcc" } },
};

export const useToast = () => {
  const Modal = useModal();
  const [option, setOption] = useState<ToastOptions | null>(null);

  const Show = (o: ToastOptions) => {
    setOption(o);
    Modal.Open();
    setTimeout(() => {
      Modal.Close();
      setOption(null);
    }, o?.time || 30000);
  };

  const Container = () => {
    return (
      <Modal.Container style={{ backgroundColor: "transparent" }}>
        <div
          className={`Content ${option?.customClassName}`}
          style={{
            color: "#FFFFFF",
            borderRadius: "10px",
            padding: "0.5em 1em",
            display: "flex",
            gap: "0.5em",
            ...ToastTypeStyle[option?.type ?? "info"].style,
            ...option?.customStyle,
          }}
        >
          {ToastTypeStyle[option?.type ?? "info"].icon}
          {option?.message}
        </div>
      </Modal.Container>
    );
  };

  return { Show, Container };
};
