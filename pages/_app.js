import GlobalStyle from "@/styles/styles";
import Layout from "@/components/LayoutComp/LayoutComp";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  ////////// favorite functionality ///////////

  const [favorites, setFavorites] = useState([]); // state to represent if an article is in the database or not

  ////// initial favorites fetch to determine what needs to be stored or taken down in/from state
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites"); // endpoint to fetch favorites
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites:", response.status);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component
            {...pageProps}
            favorites={favorites}
            // toggleFavorite={toggleFavorite}
            setFavorites={setFavorites}
            // isFavorite={isFavorite}
          />
        </Layout>
      </SessionProvider>
    </>
  );
}
