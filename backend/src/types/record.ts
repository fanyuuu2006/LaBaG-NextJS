import { authUser } from "./user";

export type gameRecord = {
  time?: string;
  id: authUser["id"];
  name?: string;
  score: number;
};

export type dataRecordColumns = keyof gameRecord;

export const dataRecordIndex: Record<dataRecordColumns, number> = {
  time: 0,
  id: 1,
  name: 2,
  score: 3,
};
