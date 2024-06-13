import Layout from "@/components/Layout/LayoutComp";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
      <Layout />
    </>
  );
}
