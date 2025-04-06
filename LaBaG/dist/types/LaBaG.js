"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLaBaG = void 0;
const P_1 = require("@/types/P");
const RandInt_1 = require("../utils/RandInt");
const __1 = require("..");
class BaseLaBaG {
    AllData = {};
    OneData = {};
    DataIndex = 0;
    Times = 30;
    Played = 0;
    Score = 0;
    MarginScore = 0;
    Ps = [null, null, null];
    RateRanges = [
        "Normal",
        "SuperHHH",
        "GreenWei",
        "PiKaChu",
    ].reduce((Ranges, mode) => {
        const res = [];
        let accRate = 0;
        for (const p of Object.values(P_1.P.Obj)) {
            accRate += p.Rates[mode];
            res.push(accRate);
        }
        Ranges[mode] = res;
        return Ranges;
    }, {});
    ScoreTimes = {
        Normal: 1,
        SuperHHH: 1,
        GreenWei: 3,
        PiKaChu: 1,
    };
    ScoreTime = 1;
    ModeToScreen = false;
    constructor() { }
    GameRunning() {
        //遊戲進行
        return this.Times > this.Played;
    }
    NowMode() {
        // 查找當前模式
        const mode = Object.entries(__1.Modes).find(([_, mode]) => mode.InMode ?? false);
        return mode ? mode[0] : "Normal";
    }
    Reset() {
        // 重置
        this.AllData = {};
        this.DataIndex = 0;
        this.Played = 0;
        this.Score = 0;
        this.MarginScore = 0;
        this.ScoreTime = 1;
        this.Ps = [null, null, null];
        Object.values(__1.Modes).forEach((mode) => {
            if (mode.InMode !== undefined)
                mode.InMode = false;
            if (mode.Score !== undefined)
                mode.Score = 0;
            if (mode.RandNum !== undefined)
                mode.RandNum = 0;
            if (mode.Times !== undefined)
                mode.Times = 0;
        });
    }
    Random() {
        const RandNums = Array.from({ length: 3 }, () => (0, RandInt_1.RandInt)());
        RandNums.forEach((RandNum, index) => {
            this.OneData[`RandNums[${index}]`] = RandNum;
        });
        Object.values(__1.Modes).forEach((mode) => {
            mode.Random?.();
        });
        this.OneData["SuperHHH"] = __1.Modes.SuperHHH.RandNum;
        this.OneData["GreenWei"] = __1.Modes.GreenWei.RandNum;
        const RateRange = this.RateRanges[this.NowMode()];
        const PCodes = Object.keys(P_1.P.Obj);
        RandNums.forEach((RandNum, i) => {
            const code = PCodes.find((_, j) => RandNum <= RateRange[j]);
            if (code) {
                this.Ps[i] = P_1.P.Obj[code];
            }
        });
        // 累積咖波累積數
        this.Ps.forEach((p) => {
            if (__1.Modes.GreenWei.Score !== undefined) {
                if (p?.Code === "A" && __1.Modes.GreenWei.Score < 20) {
                    __1.Modes.GreenWei.Score += 1;
                }
            }
        });
    }
    CalculateScore() {
        //計算分數
        const UniqueCount = new Set(this.Ps.map((p) => p?.Code)).size;
        switch (UniqueCount) {
            case 1: // 三個一樣
                this.MarginScore += this.Ps[0]?.Scores?.[0];
                break;
            case 2: // 兩個一樣
                if (this.Ps[0]?.Code === this.Ps[1]?.Code) {
                    this.MarginScore += this.Ps[0]?.Scores?.[1];
                    this.MarginScore += this.Ps[2]?.Scores?.[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.4);
                }
                else if (this.Ps[1]?.Code === this.Ps[2]?.Code) {
                    this.MarginScore += this.Ps[1]?.Scores?.[1];
                    this.MarginScore += this.Ps[0]?.Scores?.[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.4);
                }
                else if (this.Ps[2]?.Code === this.Ps[0]?.Code) {
                    this.MarginScore += this.Ps[2]?.Scores?.[1];
                    this.MarginScore += this.Ps[1]?.Scores?.[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.4);
                }
                break;
            case 3: // 三個不一樣
                this.MarginScore += this.Ps[0]?.Scores?.[2];
                this.MarginScore += this.Ps[1]?.Scores?.[2];
                this.MarginScore += this.Ps[2]?.Scores?.[2];
                this.MarginScore = Math.round(this.MarginScore / 3);
                break;
        }
        // 根據當前模式更新加分倍數
        this.ScoreTime = this.ScoreTimes[this.NowMode()];
        this.MarginScore *= this.ScoreTime;
    }
    Result() {
        // 結果
        this.Played += 1;
        this.DataIndex += 1;
        this.Score += this.MarginScore;
        this.AllData[`${this.DataIndex}`] = this.OneData;
    }
    JudgeMode() {
        if (!this.GameRunning()) {
            __1.Modes.PiKaChu.Judge?.(this);
            return;
        }
        const mode = this.NowMode();
        switch (mode) {
            case "Normal":
            case "PiKaChu":
                __1.Modes.SuperHHH.Judge?.(this);
                if (!__1.Modes.SuperHHH.InMode) {
                    __1.Modes.GreenWei.Judge?.(this);
                }
                break;
            case "SuperHHH":
                __1.Modes.SuperHHH.Judge?.(this);
                break;
            case "GreenWei":
                __1.Modes.GreenWei.Judge?.(this);
                break;
        }
    }
    Logic() {
        // 邏輯流程
        this.Reset();
        while (this.GameRunning()) {
            this.ModeToScreen = false;
            this.OneData = {};
            this.MarginScore = 0;
            this.Random();
            this.CalculateScore();
            this.Result();
            this.JudgeMode();
        }
    }
}
exports.BaseLaBaG = BaseLaBaG;
