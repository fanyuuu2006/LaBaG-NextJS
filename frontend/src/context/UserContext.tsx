"use client";
import { CustomSessionUser } from "@/lib/authOptions";
import { SessionProvider, useSession } from "next-auth/react";
import { SheetDatas } from "@/lib/Sheet";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

export type HistoryRecordData = {
  index: number;
  timestamp: string;
  score: number;
};

export class LaBaGUser implements CustomSessionUser {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  image?: string | undefined;
  historyRecord?: HistoryRecordData[];

  constructor(user: CustomSessionUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
    this.getHistoryRecord();
  }

  // 獲取歷史記錄
  async getHistoryRecord(): Promise<HistoryRecordData[]> {
    if (!this.id) return [];

    const res = await fetch("/api/Sheet");
    if (!res.ok) throw new Error("API 回應錯誤");

    const data: SheetDatas = await res.json();
    this.historyRecord =
      data.RecordRows?.filter((row) => row[1] === this.id)?.map(
        (row, index) => ({
          index,
          timestamp: row[0] ?? "",
          score: parseInt(row[3] ?? "0"),
        })
      ) ?? [];
    return this.historyRecord;
  }

  // 獲取最高分
  historyScore(): number {
    return Math.max(0, ...(this.historyRecord?.map((h) => h.score) ?? []));
  }
}

// 建立 Context
const LaBaGUserContext = createContext<
  | {
      User: LaBaGUser | undefined;
      setUser: Dispatch<SetStateAction<LaBaGUser | undefined>>;
      Loading: boolean;
    }
  | undefined
>(undefined);

export const LaBaGUserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const user = session?.user as CustomSessionUser | null;
  const [User, setUser] = useState<LaBaGUser | undefined>(undefined);
  const Loading = status === "loading";

  useEffect(() => {
    if (!user) {
      setUser(undefined);

      return;
    }

    setUser(new LaBaGUser(user));
  }, [user]);

  return (
    <LaBaGUserContext.Provider value={{ User, setUser, Loading }}>
      {children}
    </LaBaGUserContext.Provider>
  );
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <LaBaGUserProvider>{children}</LaBaGUserProvider>
    </SessionProvider>
  );
};

// 建立 useLaBaGUser Hook

// 修改後的 useUser Hook，接受可選的 id 參數
export const useUser = (id?: string) => {
  const context = useContext(LaBaGUserContext);
  if (!context) {
    throw new Error("useUser 必須在 UserProvider 內使用");
  }

  const { User, Loading } = context;
  const [FetchedUser, setFetchedUser] = useState<LaBaGUser | undefined>(
    undefined
  );
  const [Fetching, setFetching] = useState<boolean>(false);

  // 如果有傳入 id，則查詢該 id 的用戶資料
  useEffect(() => {
    if (id) {
      setFetching(true);
      fetch("/api/Sheet")
        .then(async (res) => {
          if (!res.ok) throw new Error("API 回應錯誤");
          return await res.json();
        })
        .then((data: SheetDatas) => {
          const userData = data.UserRows.find((row) => row[1] === id);
          if (userData) {
            setFetchedUser(
              new LaBaGUser({
                id: userData[1] ?? "",
                name: userData[2] ?? "",
                email: userData[3] ?? "",
                image: userData[4] ?? "",
              })
            );
          }
          setFetching(false);
        })
        .catch(() => setFetching(false));
    }
  }, [id]);

  // 如果沒有 id，則使用 Context 中的 User
  return {
    User: id ? FetchedUser : User, // 如果有 id，則返回查詢到的 User，否則返回 Context 中的 User
    Loading: Loading || Fetching, // 如果登入狀態是 loading 或者在獲取資料時，則為 loading
  };
};
