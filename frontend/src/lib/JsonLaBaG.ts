import { Modes } from "./Mode";
import { P } from "./P";
import { BaseLaBaG } from "./LaBaG";

export class JsonLaBaG extends BaseLaBaG {
  jsonData: BaseLaBaG["AllData"];
  dataIndex: string;
  constructor() {
    super();
    this.jsonData = {};
    this.dataIndex = "0";
  }

  SetupData(data: BaseLaBaG["AllData"]): void {
    this.jsonData = data;
  }

  Reset(): void {
    super.Reset();
    this.dataIndex = "0";
  }

  Random(): void {
    if (!(this.dataIndex in this.jsonData)) {
      super.Random();
      return;
    }

    const currData: Record<string, number> = this.jsonData[this.dataIndex];
    const RandNums: [number, number, number] = [
      currData["RandNum[0]"],
      currData["RandNum[1]"],
      currData["RandNum[2]"],
    ];

    Modes.SuperHHH.RandNum = currData["SuperHHH"];
    Modes.GreenWei.RandNum = currData["GreenWei"];

    const RateRange: number[] = this.RateRanges[this.NowMode()];
    const PCodes: string[] = Object.keys(P.Obj);
    RandNums.forEach((RandNum: number, i: number) => {
      const code = PCodes.find((_, j: number) => RandNum <= RateRange[j]);
      if (code) {
        this.Ps[i] = P.Obj[code];
      }
    });

    // 累積咖波累積數
    this.Ps.forEach((p) => {
      if (Modes.GreenWei.Score !== undefined) {
        if (p?.Code === "A" && Modes.GreenWei.Score < 20) {
          Modes.GreenWei.Score += 1;
        }
      }
    });
  }

  Result(): void {
    super.Result();
    this.dataIndex = `${this.dataIndex + 1}`;
  }
}
