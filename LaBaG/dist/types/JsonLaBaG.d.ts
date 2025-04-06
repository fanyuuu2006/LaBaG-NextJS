import { BaseLaBaG } from "./LaBaG";
export declare class JsonLaBaG extends BaseLaBaG {
    jsonData: BaseLaBaG["AllData"];
    dataIndex: number;
    constructor();
    SetupData(data: BaseLaBaG["AllData"]): void;
    Reset(): void;
    Random(): void;
    Result(): void;
}
