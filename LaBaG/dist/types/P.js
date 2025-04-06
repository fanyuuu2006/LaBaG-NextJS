"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P = void 0;
class P {
    static Obj = {};
    Code;
    Scores;
    Rates;
    constructor(Code = null, Scores = [0, 0, 0], Rates = {
        Normal: 0,
        SuperHHH: 0,
        GreenWei: 0,
        PiKaChu: 0,
    }) {
        this.Code = Code;
        this.Scores = Scores;
        this.Rates = Rates;
        if (this.Code && !P.Obj[this.Code]) {
            P.Obj[this.Code] = this;
        }
    }
}
exports.P = P;
