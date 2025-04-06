"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLaBaG = void 0;
const P_1 = require("./P");
const LaBaG_1 = require("./LaBaG");
const __1 = require("..");
class JsonLaBaG extends LaBaG_1.BaseLaBaG {
    jsonData;
    dataIndex;
    constructor() {
        super();
        this.jsonData = {};
        this.dataIndex = 0;
    }
    SetupData(data) {
        this.jsonData = data;
    }
    Reset() {
        super.Reset();
        this.dataIndex = 0;
    }
    Random() {
        const currData = this.jsonData[this.dataIndex];
        if (!currData) {
            super.Random();
            return;
        }
        try {
            const RandNums = [
                currData["RandNum[0]"] ?? 0,
                currData["RandNum[1]"] ?? 0,
                currData["RandNum[2]"] ?? 0,
            ];
            __1.Modes.SuperHHH.RandNum = currData["SuperHHH"] ?? 0;
            __1.Modes.GreenWei.RandNum = currData["GreenWei"] ?? 0;
            const RateRange = this.RateRanges[this.NowMode()];
            const PCodes = Object.keys(P_1.P.Obj);
            RandNums.forEach((RandNum, i) => {
                const code = PCodes.find((_, j) => RandNum <= RateRange[j]);
                if (code) {
                    this.Ps[i] = P_1.P.Obj[code];
                }
            });
            // 累積 GreenWei 分數
            this.Ps.forEach((p) => {
                if (p?.Code === "A" &&
                    __1.Modes.GreenWei.Score !== undefined &&
                    __1.Modes.GreenWei.Score < 20) {
                    __1.Modes.GreenWei.Score += 1;
                }
            });
        }
        catch (error) {
            console.error("Error in Random():", error);
            super.Random();
        }
    }
    Result() {
        super.Result();
        this.dataIndex++;
    }
}
exports.JsonLaBaG = JsonLaBaG;
