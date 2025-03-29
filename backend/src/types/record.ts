import { authUser } from "./auth";

export type gameRecord = {
  time?: string;
  id: authUser["id"];
  name?: string;
  score: number;
};
