import { ModeNames } from "./Mode";
export type PData = {
    name: string;
    code: string;
    rates: Record<ModeNames, number>;
    scores: [number, number, number];
};
export declare class P {
    static Obj: Record<string, P>;
    Code: string | null;
    Scores: [number, number, number];
    Rates: Record<ModeNames, number>;
    constructor(Code?: string | null, Scores?: [number, number, number], Rates?: Record<ModeNames, number>);
}
