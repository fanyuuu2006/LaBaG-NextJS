import Image from "next/image";

export default function Pictures({ LP, MP, RP }) {
  return (
    <div className="Pictures">
      <Image src={LP} alt = "Left Picture"/>
      <Image src={MP} alt = "Mid Picture"/>
      <Image src={RP} alt = "Right Picture"/>
    </div>
  );
}
