import Image from "next/image";
import { useRouter } from "next/navigation";
import Title from "@/assets/Title.png"
import LoginButton from "./LoginButton";

export default function TopBar(){
    const router = useRouter();
    return(
        <div className="TopBar">
        <Image
        onClick={ () => {router.push("/")}}
        style={{ cursor: "pointer", objectPosition: "left", marginInline: "20px"}}
        src={Title}
        alt="LaBaG Logo"
        />
        <LoginButton/>
        </div>
    );
}