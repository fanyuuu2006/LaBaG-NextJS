"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandInt = RandInt;
function RandInt() {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
