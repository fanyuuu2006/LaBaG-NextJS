import { Sheet } from "@/lib/Sheet";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export type CustomSessionUser = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
  idToken?: string;
};

// 設置 NextAuth 配置
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process?.env?.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 把 user.id（如果有的話）加入 token
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // 確保 session.user 存在，並且加上 id
      if (session.user) {
        // 讓 TypeScript 知道 user 有 id 和 idToken
        session.user = {
          ...session.user,
          id: token.sub ?? "",
          idToken: token.idToken ?? undefined,
        } as CustomSessionUser;

        if ((session.user as CustomSessionUser).id) {
          const response = await fetch(
            `${process?.env?.NEXTAUTH_URL}/api/Sheet`
          );
          const { UserRows }: { UserRows: string[] } = await response.json();
          const userIndex = UserRows?.findIndex(
            (row) =>
              Array.isArray(row) &&
              row.length > 1 &&
              row[1] === (session.user as CustomSessionUser).id
          );

          if (userIndex !== -1) {
            // 如果找到用戶
            session.user.name = UserRows?.[userIndex][2];
            session.user.email = UserRows?.[userIndex][3];
            session.user.image = UserRows?.[userIndex][4];
          } else {
            // 如果找不到用戶
            try {
              await Sheet.spreadsheets.values.append({
                spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
                range: "用戶資料!A:F",
                valueInputOption: "RAW",
                requestBody: {
                  values: [
                    [
                      new Date().toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                      }),
                      (session.user as CustomSessionUser).id,
                      (session.user as CustomSessionUser).name,
                      (session.user as CustomSessionUser).email,
                      (session.user as CustomSessionUser).image,
                    ],
                  ],
                },
              });
              console.log("用戶資料添加成功: ", session.user);
            } catch (error) {
              console.error("無法存取 Google Sheets: ", error);
            }
          }
        }
      }
      return session;
    },
  },
};

// 直接匯出 handler 並處理 GET 和 POST 請求
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
