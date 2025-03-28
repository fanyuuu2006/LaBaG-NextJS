"use client";
import { AuthUser, signOptions, LaBaGUser } from "@/types/Auth";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// 建立 Context
const UserContext = createContext<
  | {
      User: LaBaGUser | undefined;
      Loading: boolean;
      signIn: (signBy: signOptions) => void;
      signOut: () => void;
    }
  | undefined
>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<LaBaGUser | undefined>(undefined);
  const [Loading, setLoading] = useState<boolean>(true);
  const signIn = (signBy: signOptions) => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${signBy}`;
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    setUser(undefined);
  };

  useEffect(() => {
    if (typeof window === "undefined") return; // 避免伺服器端執行
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setLoading(false);
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API 回應錯誤");
        return res.json() as AuthUser;
      })
      .then((user) => {
        setUser(new LaBaGUser(user));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // 無論成功還是錯誤，都應該結束 loading 狀態
      });
  }, []);

  return (
    <UserContext.Provider value={{ User, Loading, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// 建立 useLaBaGUser Hook

// 修改後的 useUser Hook，接受可選的 id 參數
export const useUser = (id?: string) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser 必須在 UserProvider 內使用");
  }

  const { User, Loading, signIn, signOut } = context;
  const [FetchedUser, setFetchedUser] = useState<LaBaGUser | undefined>(
    undefined
  );
  const [Fetching, setFetching] = useState<boolean>(false);

  // 如果有傳入 id，則查詢該 id 的用戶資料
  useEffect(() => {
    if (id) {
      setFetching(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/getUsers`)
        .then(async (res) => {
          if (!res.ok) throw new Error("API 回應錯誤");
          return await res.json();
        })
        .then((data: string[][]) => {
          const userData = data.find((row) => row[1] === id);
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

  // 如果沒有 id，則使用 Context 中的 AuthUser
  return {
    User: id ? FetchedUser : User, // 如果有 id，則返回查詢到的 User，否則返回 Context 中的 AuthUser
    Loading: Loading || Fetching, // 如果登入狀態是 loading 或者在獲取資料時，則為 loading
    signIn,
    signOut,
  };
};
