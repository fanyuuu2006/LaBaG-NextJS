import { RecordData } from "./Record";

export type signOptions = "google" | "github";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export class LaBaGUser implements AuthUser {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  image?: string | undefined;

  constructor(user: AuthUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
  }

  // 獲取歷史記錄
  async getHistoryRecord(): Promise<RecordData[]> {
    if (!this.id) return [];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records`
    );
    if (!res.ok) throw new Error("API 回應錯誤");

    const data: string[][] = await res.json();

    return (
      data
        .filter((row) => row[1] === this.id)
        ?.map((row, index) => ({
          index,
          timestamp: row[0] ?? "",
          score: parseInt(row[3] ?? "0"),
        })) ?? []
    );
  }

  // 獲取最高分
  async historyScore(): Promise<number> {
    return Math.max(
      0,
      ...((await this.getHistoryRecord()).map((h) => h.score) ?? [])
    );
  }
}
