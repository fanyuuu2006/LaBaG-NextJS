import "@/style/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { NowModeProvider } from "../context/NowModeContext";
import { Header } from "@/components/common/Header";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "啦八機 LaBaG",
  description: "機八啦",
  icons: "/Superhhh.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        <UserProvider>
          <NowModeProvider>
            <Header />
            {children}
          </NowModeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
