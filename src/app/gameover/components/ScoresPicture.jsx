import Image from "next/image";
import SB from "@/assets/SB.jpg"
function ScoresPicture() {
  return (
    <>
      <Image src={SB} 
      alt = "分數計算規則"
      className="SB"/>
    </>
  );
}export default ScoresPicture;