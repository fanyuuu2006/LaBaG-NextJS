"use client";
import Image, { StaticImageData } from "next/image";
import { ModeNames } from "../../lib/Mode";
import Title from "@/assets/Title.png";
import SuperTitle from "@/assets/SuperTitle.png";
import GreenTitle from "@/assets/GreenTitle.png";
import KachuTitle from "@/assets/KachuTitle.png";
import { useNowMode } from "@/context/NowModeContext";
import { useRouter } from "next/navigation";

const ModeTitle: Record<ModeNames, StaticImageData> = {
  Normal: Title,
  SuperHHH: SuperTitle,
  GreenWei: GreenTitle,
  PiKaChu: KachuTitle,
};

export const Logo = () => {
  const router = useRouter();
  const { NowMode } = useNowMode();
  return (
    // <Tooltip title="點擊返回首頁">
    <Image
      priority
      style={{
        height: "100%",
        maxHeight: "100px",
        width: "auto",
        objectFit: "cover",
        cursor: "pointer",
      }}
      src={ModeTitle[NowMode]}
      alt={NowMode}
      onClick={() => {
        router.push("./");
      }}
    />
    // </Tooltip>
  );
};
