import  P  from "../backend/P";
import Game from "../backend/PlayLaBaG";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Pictures({LP, MP, RP}) {
  const PicturesInfo = {
    A:{
      title: "咖波",
      rates: P.Obj["A"].rate_obj,
    },
    B:{
      title: "阿禾",
      rates: P.Obj["B"].rate_obj,
    },
    C:{
      title: "猥褻男",
      rates: P.Obj["C"].rate_obj,
    },
    D:{
      title: "蚊傑",
      rates: P.Obj["D"].rate_obj,
    },
    E:{
      title: "皮卡丘",
      rates: P.Obj["E"].rate_obj,
    },
    F:{
      title: "館長",
      rates: P.Obj["F"].rate_obj,
    },
  }



  function InfoSwal(code, src){
    const Info = PicturesInfo[code];
    Swal.fire({
      title: Info.title,
      text: `一般機率: ${Info.rates["Normal"]}\n超級阿禾模式機率: ${Info.rates["SuperHHH"]}\n`,
      icon: src,
    });
  }
  return (
    <div className="Pictures">
      <Image src={LP} alt = "Left Picture" />
      <Image src={MP} alt = "Mid Picture" />
      <Image src={RP} alt = "Right Picture" />
    </div>
  );
}
