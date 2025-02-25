import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 登入選項
export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // 確保 session 有 user ID
      return session;
    },
  },
};

const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
