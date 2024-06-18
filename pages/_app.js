import GlobalStyle from "@/styles/styles";
import Layout from "@/components/LayoutComp/LayoutComp";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
