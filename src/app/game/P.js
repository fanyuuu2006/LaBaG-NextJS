export class P {
    static Obj = {};

    constructor(code = null, score_array = [], rate_map = { "Normal": 0 }) {
        this.code = code;
        this.score_array = score_array;
        this.rate_map = rate_map;
        this.AddToMap();
    }

    AddToMap() {
        if (!(this.code in P.Obj)) {
            P.Obj[this.code] = this;
        }
    }
}
