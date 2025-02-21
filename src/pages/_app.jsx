import Head from "next/head";
import "@/style/global.css";

function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
          <title>啦八機</title>
          <meta name="description" content="這是我的 Next.js 網站" />
          <link rel="icon" href="/Superhhh.ico" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

export default MyApp;
