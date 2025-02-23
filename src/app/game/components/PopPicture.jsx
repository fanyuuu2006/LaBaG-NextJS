import Swal from "sweetalert2";
import Image from "next/image";
import SuperPOP from "@/assets/SuperPOP.jpg";
import GreenPOP from "@/assets/GreenPOP.jpg";
import KachuPOP from "@/assets/KachuPOP.jpg";

const POPs = {
  SuperHHH: SuperPOP,
  GreenWei: GreenPOP,
  PiKaChu: KachuPOP,
};

export default function PopPicture({ NowMode, setNowPoP }) {
  return (
    <>
      <Image
        onClick={() => {
          setNowPoP(false);
        }}
        src={POPs[NowMode]}
        alt="PopPicture"
        style={{
          height: "100vh",
          width: "auto",
          objectFit: "contain" /* 保持完整顯示 */,
          cursor: "pointer",
        }}
      />
    </>
  );
}

export function PopPictureV2(NowMode) {
  Swal.fire({
    imageUrl: POPs[NowMode].src,
    imageWidth: "auto",
    imageHeight: "100vh",
    background: "transparent", // 背景透明
    showConfirmButton: false,
    allowOutsideClick: true,
  });
}
