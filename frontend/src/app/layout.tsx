import type { Metadata } from "next";
import "@/style/globals.css";
import { ClientSessionProvider } from "@/component/common/ClientSessionProvider";
import { NowModeProvider } from "./NowModeContext";
import { Header } from "@/component/common/Header";

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
        <ClientSessionProvider>
          <NowModeProvider>
            <Header/>
            {children}
          </NowModeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
