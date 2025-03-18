declare module "@/json/ModeColors.json" {
  import { ModeNames } from "@/lib/Mode";
  export type ModeColor = { dark: string; light: string };
  const value: Record<ModeNames, ModeColor>;
  export default value;
}

declare module "@/json/PDatas.json" {
  import { ModeNames } from "@/lib/Mode";
  export type PData = {
    name: string;
    code: string;
    rates: Record<ModeNames, number>;
    scores: [number, number, number];
  };
  const value: Record<string, PData>;
  export default value;
}

declare module "*.mp3" {
  const value: string;
  export default value;
}
