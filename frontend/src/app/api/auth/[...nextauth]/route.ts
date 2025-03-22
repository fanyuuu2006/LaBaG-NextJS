import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// 直接匯出 handler 並處理 GET 和 POST 請求
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
