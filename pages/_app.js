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
        <Component {...pageProps} />
      </SessionProvider>
      <Layout />
    </>
  );
}
