import { gameRecord } from "./Record";

export type signOptions = "google" | "github";

export interface authUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

export class LaBaGUser implements authUser {
  id: authUser["id"];
  name?: authUser["name"] | undefined;
  image?: authUser["image"] | undefined;

  constructor(user: authUser) {
    this.id = user.id;
    this.name = user.name;
    this.image = user.image;
  }

  // 獲取歷史記錄
  async getHistoryRecord(): Promise<gameRecord[]> {
    if (!this.id) return [];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/data/records/${this.id}`
    );
    if (!res.ok) throw new Error("API 回應錯誤");

    return await res.json();
  }

  // 獲取最高分
  async historyScore(): Promise<gameRecord["score"]> {
    return Math.max(0, ...(await this.getHistoryRecord()).map((h) => h.score));
  }
}
