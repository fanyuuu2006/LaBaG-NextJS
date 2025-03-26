export type RecordData = {
    index: number;
    timestamp: string;
    score: number;
};

export type CommitScoreProps = {
    Score: number;
    JsonData: Record<string, Record<string, number>>;
  };
  