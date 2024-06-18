import GlobalStyle from "@/styles/styles";
import Layout from "@/components/LayoutComp/LayoutComp";
import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
