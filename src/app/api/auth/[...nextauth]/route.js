import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 設置 NextAuth 配置
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // 確保 session 包含 user ID
      return session;
    },
  },
};

// 直接匯出 handler 並處理 GET 和 POST 請求
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
