import "@/styles/global.css";

export const metadata = {
  title: "啦八機",
  description: "飯魚高中時的隨筆神作",
  icons: "/Superhhh.ico"
};


export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
