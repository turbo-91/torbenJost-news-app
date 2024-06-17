import HeaderComp from "@/components/HeaderComp/Header";
import Layout from "@/components/LayoutComp/LayoutComp";
import GlobalStyle from "@/styles/styles";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <HeaderComp />
        <Component {...pageProps} />
      </SessionProvider>
      <Layout />
    </>
  );
}
