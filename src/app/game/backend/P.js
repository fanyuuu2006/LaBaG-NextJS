export default class P {
    static Obj = {};

    constructor(code = null, score_array = [], rate_obj = { "Normal": 0 }) {
        this.code = code;
        this.score_array = score_array;
        this.rate_obj = rate_obj;
        this.AddToObj();
    }

    AddToObj() {
        if (!(this.code in P.Obj)) {
            P.Obj[this.code] = this;
        }
    }
}
