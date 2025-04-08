import "@/style/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { NowModeProvider } from "../context/NowModeContext";
import { Header } from "@/components/common/Header";
import { UserProvider } from "@/context/UserContext";
import { MusicProvider } from "@/context/MusicContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://labag.vercel.app"),
  title: "啦八機 LaBaG",
  description: "只需動動手指就能在無聊時候打發時間的小遊戲",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",

  authors: [
    { name: "范余" },
    { name: "范余振富" },
    { name: "飯魚" },
    { name: "飯魚正負" },
  ],
  keywords: [
    "啦八機",
    "雞巴啦",
    "機八啦",
    "LaBaG",
    "LABAG",
    "labag",
    "超級阿禾",
    "陳敬禾",
    "阿禾",
    "SuperHHH",
    "綠光阿瑋",
    "GreenWei",
    "皮卡丘",
    "PiKaChu",
    "拉霸機",
    "吃角子老虎機",
    "角子機",
    "范余",
    "飯魚",
    "范余振富",
    "飯魚正負",
  ],

  openGraph: {
    title: "啦八機 LaBaG",
    description: "只需動動手指就能在無聊時候打發時間的小遊戲",
    url: "https://labag.vercel.app",
    siteName: "啦八機 LaBaG",
    locale: "zh-TW",
    images: [
      {
        url: "/favicon.ico", // 分享時顯示的圖片
        width: 600,
        height: 600,
        alt: "LaBaG Logo",
      },
    ],
    type: "website",
  },

  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
      </head>
      <body>
        <UserProvider>
          <NowModeProvider>
            <MusicProvider>
              <Header />
              {children}
            </MusicProvider>
          </NowModeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
