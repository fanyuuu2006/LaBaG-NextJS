"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDatas = exports.P = exports.Modes = exports.JsonLaBaG = exports.PlayLaBaG = void 0;
const PDatas_json_1 = __importDefault(require("@/json/PDatas.json"));
exports.PDatas = PDatas_json_1.default;
const P_1 = require("@/types/P");
Object.defineProperty(exports, "P", { enumerable: true, get: function () { return P_1.P; } });
const RandInt_1 = require("./utils/RandInt");
const PlayLaBaG_1 = require("./types/PlayLaBaG");
Object.defineProperty(exports, "PlayLaBaG", { enumerable: true, get: function () { return PlayLaBaG_1.PlayLaBaG; } });
const JsonLaBaG_1 = require("./types/JsonLaBaG");
Object.defineProperty(exports, "JsonLaBaG", { enumerable: true, get: function () { return JsonLaBaG_1.JsonLaBaG; } });
Object.values(PDatas_json_1.default).forEach((Pdata) => {
    new P_1.P(Pdata.code, Pdata.scores, Pdata.rates);
});
const Modes = {
    // 超級阿禾
    SuperHHH: {
        InMode: false,
        Rate: 15,
        Times: 0,
        Score: 0,
        RandNum: 0,
        Random() {
            this.RandNum = (0, RandInt_1.RandInt)();
        },
        Judge(Game) {
            if (!Game.GameRunning() ||
                this.RandNum === undefined ||
                this.Times === undefined ||
                this.Rate === undefined ||
                this.Score === undefined) {
                return;
            }
            this.Score = 0; // Reset score
            if (this.InMode) {
                this.Times -= 1;
                if (Game.Ps.every((p) => p?.Code === "B")) {
                    this.Times += 2;
                }
                if (this.Times <= 0) {
                    this.InMode = false;
                    Game.JudgeMode();
                    Game.ModeToScreen = true;
                }
            }
            else {
                if (this.RandNum <= this.Rate && Game.Ps.some((p) => p?.Code === "B")) {
                    this.InMode = true;
                    this.Times += 6;
                    Game.ModeToScreen = true;
                    if (Modes.PiKaChu.InMode) {
                        Modes.PiKaChu.InMode = false;
                    }
                    // 超級阿禾加倍
                    if (Game.Ps.every((p) => p?.Code === "B")) {
                        this.Score = Math.round((Game.Score * Game.ScoreTime) / 2);
                        Game.MarginScore += this.Score;
                    }
                }
            }
        },
    },
    GreenWei: {
        InMode: false,
        Rate: 35,
        Times: 0,
        Score: 0, // 咖波累積數
        RandNum: 0,
        Random() {
            this.RandNum = (0, RandInt_1.RandInt)();
        },
        Judge(Game) {
            if (!Game.GameRunning() ||
                this.RandNum === undefined ||
                this.Times === undefined ||
                this.Rate === undefined ||
                this.Score === undefined) {
                return;
            }
            if (this.InMode) {
                this.Times -= 1;
                if (Game.Ps.every((p) => p?.Code === "A")) {
                    this.Times += 1;
                }
                if (this.Times <= 0) {
                    this.InMode = false;
                    Game.JudgeMode();
                    Game.ModeToScreen = true;
                }
            }
            else {
                if (this.RandNum <= this.Rate &&
                    Game.Ps.every((p) => p?.Code === "A")) {
                    this.InMode = true;
                    this.Times += 2;
                    Game.ModeToScreen = true;
                    if (Modes.PiKaChu.InMode) {
                        Modes.PiKaChu.InMode = false;
                    }
                    return;
                }
                else if (this.Score >= 20) {
                    // 咖波累積數達到 20
                    this.InMode = true;
                    this.Times += 2;
                    this.Score = 0;
                    Game.ModeToScreen = true;
                    if (Modes.PiKaChu.InMode) {
                        Modes.PiKaChu.InMode = false;
                    }
                    return;
                }
            }
        },
    },
    PiKaChu: {
        InMode: false,
        Times: 0,
        Judge(Game) {
            if (!Game.GameRunning() && this.Times !== undefined) {
                // 關掉其他模式
                Modes.SuperHHH.InMode = false;
                Modes.GreenWei.InMode = false;
                if (Game.Ps.some((p) => p?.Code === "E")) {
                    this.InMode = true;
                    Game.Played -= 5;
                    this.Times += 1;
                    Game.ModeToScreen = true;
                }
                else {
                    this.InMode = false;
                }
            }
        },
    },
};
exports.Modes = Modes;
