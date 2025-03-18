import { ModeNames } from "./Mode";
import PDatas, { PData } from "@/json/PDatas.json";

export const DefaultRates: Record<ModeNames, number> = {
  Normal: 0,
  SuperHHH: 0,
  GreenWei: 0,
  PiKaChu: 0,
};

export class P {
  static Obj: Record<string, P> = {};

  Code: string | null;
  Scores: [number, number, number];
  Rates: Record<ModeNames, number>;
  constructor(
    Code: string | null = null,
    Scores: [number, number, number] = [0, 0, 0],
    Rates: Record<ModeNames, number> = { ...DefaultRates }
  ) {
    this.Code = Code;
    this.Scores = Scores;
    this.Rates = Rates;

    if (this.Code && !P.Obj[this.Code]) {
      P.Obj[this.Code] = this;
    }
  }
}

Object.values(PDatas).forEach((Pdata: PData) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _: P = new P(Pdata.code, Pdata.scores, Pdata.rates);
});
