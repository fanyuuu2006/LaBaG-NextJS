import "@/styles/global.css";
import Script from "next/script";

export const metadata = {
  title: "啦八機",
  description: "飯魚高中時的隨筆神作",
  icons: "/Superhhh.ico",
};
const EstimateID = "G-XBPKGC8ZG6";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${EstimateID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${EstimateID}');
          `,
        }}
      />
      <body>{children}</body>
    </html>
  );
}
