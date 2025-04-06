import PDatas from "@/json/PDatas.json";
import { P, PData } from "@/types/P";
import { LaBaG } from "./types/LaBaG";
import { Mode, ModeNames } from "./types/Mode";
import { PlayLaBaG } from "./types/PlayLaBaG";
import { JsonLaBaG } from "./types/JsonLaBaG";
declare const Modes: Record<Exclude<ModeNames, "Normal">, Mode>;
export { LaBaG, PlayLaBaG, JsonLaBaG, Modes, ModeNames, P, PData, PDatas };
