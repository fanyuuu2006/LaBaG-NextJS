import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export type CustomSessionUser = {
  name?: string;
  email?: string;
  image?: string;
  id?: string;
  accessToken?: string;
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
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // 確保 session.user 存在，並且加上 id
      if (session.user) {
        // 讓 TypeScript 知道 user 有 id 和 accessToken
        session.user = {
          ...session.user,
          id: token.sub ?? "",
          accessToken: token.accessToken ?? undefined,
        } as CustomSessionUser;
      }
      return session;
    },
  },
};

// 直接匯出 handler 並處理 GET 和 POST 請求
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
