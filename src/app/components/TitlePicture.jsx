import Image from "next/image";
import Title from "@/assets/Title.png";
import SuperTitle from "@/assets/SuperTitle.png";
import GreenTitle from "@/assets/GreenTitle.png";
import KachuTitle from "@/assets/KachuTitle.png";

const Titles = {
  Normal: Title,
  SuperHHH: SuperTitle,
  GreenWei: GreenTitle,
  PiKaChu: KachuTitle,
};

export default function TitlePicture({ NowMode }) {
  return (
    <Image
      src={Titles[NowMode]}
      alt="Logo"
      className="Logo"
      priority
    />
  );
}

