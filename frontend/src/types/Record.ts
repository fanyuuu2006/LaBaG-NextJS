import { authUser } from "./Auth";

export type gameRecord = {
  time?: string;
  id: authUser["id"];
  name?: string;
  score: number;
};

export interface RankedGameRecord extends gameRecord {
  rank: number;
}

export type CommitScoreProps = {
  score: number;
};

