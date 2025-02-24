import Image from "next/image";
import { useRouter } from "next/navigation";
import Game from "@/app/game/backend/PlayLaBaG";
import SuperCircle from "@/assets/SuperCircle.png";

export default function CirclePicture() {
  const router = useRouter();

  function IntoGame() {
    Game.Reset();
    router.push("/game");
    console.log("切換至 Game 畫面");
  }

  return (
    <>
      <Image
        src={SuperCircle}
        alt="SuperCircle"
        priority // 添加這行，告訴 Next.js 優先加載這張圖片
        onClick={() => {
          IntoGame();
        }}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}
