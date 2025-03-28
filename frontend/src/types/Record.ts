export type RecordData = {
    index: number;
    timestamp: string;
    score: number;
};

export type CommitScoreProps = {
    score: number;
    jsonData: Record<string, Record<string, number>>;
  };
  