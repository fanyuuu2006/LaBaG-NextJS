import Swal from "sweetalert2";
import { BiInfoCircle } from "react-icons/bi";
import SB from "@/assets/SB.jpg"

export default function RuleButton() {
  const showRules = () => {
    Swal.fire({
      imageUrl: SB.src,
      imageWidth: SB.width,
      background: "transparent",
      confirmButtonText: "了解",
    });
  };

  return (
    <BiInfoCircle
      size={30}
      color="#FFFFFF"
      className="RuleButton"
      onClick={() => {
        showRules();
      }}
    />
  );
}
