"use client";
import { Space } from "antd";
import Table, { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";

type RankTableProps = {
  key: number;
  rank: number;
  name: string;
  score: number;
  timestamp: string;
};

const RankColumns: ColumnType<RankTableProps>[] = [
  {
    title: "名次",
    dataIndex: "rank",
    key: "rank",
    align: "center",
  },
  {
    title: "名稱",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "分數",
    dataIndex: "score",
    key: "score",
    align: "right",
  },
  {
    title: "時間",
    dataIndex: "timestamp",
    key: "timestamp",
    align: "center",
  },
];

export const RankSection = () => {
  const [RankDataSource, setRankDataSource] = useState<RankTableProps[] | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/Sheet");
        const data = await response.json();
        const RecordRows = data.RecordRows as string[][];

        // 使用 Map 來存放每位玩家的最高分
        const recordMap = new Map<
          string,
          { name: string; score: number; timestamp: string }
        >();

        for (const row of RecordRows) {
          const [timestamp, userId, name, scoreStr] = row;
          const score = parseInt(scoreStr);

          // 如果 ID 不存在於 Map，或新分數更高，則更新
          if (!recordMap.has(userId) || score > recordMap.get(userId)!.score) {
            recordMap.set(userId, { name, score, timestamp });
          }
        }

        // 轉換為陣列並排序
        const sortedData = Array.from(recordMap.values())
          .sort((a, b) => b.score - a.score)
          .map((value, index) => ({
            key: index,
            rank: index + 1,
            ...value,
          }));

        setRankDataSource(sortedData);
      } catch (error) {
        console.error("無法獲取排行榜數據:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      <Space direction="vertical" align="center" style={{ width: "100%"}}>
        {RankDataSource ? (
          <Table
            columns={RankColumns}
            dataSource={RankDataSource}
            pagination={false}
            />
        ) : (
          <div className="Title" style={{ color: "#FFFFFF" }}>
            資料載入中
          </div>
        )}
      </Space>
    </section>
  );
};
