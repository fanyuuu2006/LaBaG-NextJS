import { authUser } from "./user";

export type gameRecord = {
  time?: string;
  id: authUser["id"];
  name?: string;
  score: number;
};

export interface RankedGameRecord extends gameRecord {
  rank: number;
}
