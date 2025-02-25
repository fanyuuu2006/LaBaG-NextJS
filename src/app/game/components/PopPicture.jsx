import Swal from "sweetalert2";
import SuperPOP from "@/assets/SuperPOP.jpg";
import GreenPOP from "@/assets/GreenPOP.jpg";
import KachuPOP from "@/assets/KachuPOP.jpg";

const POPs = {
  SuperHHH: SuperPOP,
  GreenWei: GreenPOP,
  PiKaChu: KachuPOP,
};

export default function PopPicture(NowMode) {
  Swal.fire({
    imageUrl: POPs[NowMode].src,
    imageWidth: "auto",
    imageHeight: "100vh",
    background: "transparent", // 背景透明
    showConfirmButton: false,
    allowOutsideClick: true,
    didOpen: (popup) => {
      // 監聽點擊事件關閉彈窗
      popup.addEventListener("click", () => Swal.close());
    },
  });
}
