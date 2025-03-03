import {Game} from "@/app/game/backend/PlayLaBaG";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AgainPIC from "@/assets/AgainPIC.jpg";

export default function AgainButton() {
  const router = useRouter();
  return (
    <Image
      src={AgainPIC}
      alt="再玩一次"
      onClick={() => {
        Game.Reset();
        console.log("切換至 Game 畫面");
        router.push("/game");
      }}
      style={{
        width: "150px",
        height: "50px",
        cursor: "pointer",
      }}
    />
  );
}

