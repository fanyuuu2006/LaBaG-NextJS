import { ModeNames } from "labag";

export const ModeColors: Record<
  ModeNames,
  {
    dark: string;
    light: string;
  }
> = {
  Normal: {
    dark: "#003387",
    light: "#00FFFF",
  },
  SuperHHH: {
    dark: "#550055",
    light: "#FF00FF",
  },
  GreenWei: {
    dark: "#005500",
    light: "#00FF00",
  },
  PiKaChu: {
    dark: "#555500",
    light: "#FFFF00",
  },
} as const;
