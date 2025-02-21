"use client";
import { useState } from "react";
import Game from "./backend/PlayLaBaG";
import BackButton from "./components/BackButton";
import TitlePicture from "./components/TitlePicture";

export default function GamePage(){
    const [NowMode, setNowMode] = useState(Game.NowMode());

    return(
        <>
        <BackButton/>
        <TitlePicture NowMode={NowMode}/>
        </>
    );
}
