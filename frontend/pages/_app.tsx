import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { UserProvider } from "@/context/authenticationContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Pixie - The Movie Picking Aid</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
