import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <Head>
        <title>Code Challange</title>
        <meta name="description" content="Simple NextJS APP" />
        <link rel="icon" href="/favicon.ico" />
         </Head>
      <Component {...pageProps} />
    </main>
  );
}
