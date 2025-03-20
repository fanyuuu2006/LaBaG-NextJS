import { Modal } from "../common/Alert";
import SuperPOP from "@/assets/SuperPOP.jpg";
import GreenPOP from "@/assets/GreenPOP.jpg";
import KachuPOP from "@/assets/KachuPOP.jpg";
import { StaticImageData } from "next/image";
import { ModeNames } from "@/lib/Mode";
// import { Button, Space } from "antd";
// import ModeColors from "@/json/ModeColors.json";
// import { ReactNode } from "react";

const POPs: Record<ModeNames, StaticImageData> = {
  SuperHHH: SuperPOP,
  GreenWei: GreenPOP,
  PiKaChu: KachuPOP,
};

// const PopText: Record<ModeNames, { title: ReactNode; content: ReactNode }> = {
//   Normal: {
//     title: <div className="Title">??????</div>,
//     content: <>正常不會出現這個</>,
//   },
//   SuperHHH: { title: <div className="Title">超級阿禾出現！</div>, content: <div className="Label">皮卡丘、館長 機率大提升~</div> },
//   GreenWei: { title: <div className="Title">綠光阿瑋出現！</div>, content: "" },
//   PiKaChu: {
//     title: <div className="Title">皮卡丘為你充電！</div>,
//     content: "",
//   },
// };

export const PopPicture = (NowMode: ModeNames) => {
  Modal.fire({
    imageUrl: POPs[NowMode].src,
    imageWidth: "auto",
    imageHeight: "100vh",
    background: "transparent", // 背景透明
    showConfirmButton: false,
    allowOutsideClick: true,
    didOpen: (popup) => {
      // 監聽點擊事件關閉彈窗
      popup.addEventListener("click", () => Modal.close());
    },
  });

  // CustomModal({
  //   html: (
  //     <Space
  //       direction="vertical"
  //       align="center"
  //       style={{
  //         backgroundColor: ModeColors[NowMode].dark,
  //         border: `${ModeColors[NowMode].light} solid 3px`,
  //         borderRadius: "5%",
  //         padding: "1em 0",
  //       }}
  //     >
  //       {PopText[NowMode].title}
  //       {PopText[NowMode].content}
  //       <Button
  //         type="default"
  //         onClick={() => {
  //           Modal.close();
  //         }}
  //       >
  //         關閉
  //       </Button>
  //     </Space>
  //   ),
  // });
};
