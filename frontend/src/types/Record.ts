export type RecordData = {
    index: number;
    timestamp: string;
    score: number;
};

export type CommitScoreProps = {
    UserID: string | null;
    Name: string | null;
    Score: number;
    JsonData: Record<string, Record<string, number>>;
  };
  