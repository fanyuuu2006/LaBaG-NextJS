import "@/style/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { ClientSessionProvider } from "@/components/common/ClientSessionProvider";
import { NowModeProvider } from "./NowModeContext";
import { Header } from "@/components/common/Header";

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
