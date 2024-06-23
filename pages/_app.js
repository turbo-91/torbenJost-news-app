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
  const [isLoading, setIsLoading] = useState(true); // state to represent if the favorite fetching is loading

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const data = await response.json();
          setFavorites(data); // Assuming data is an array of favorite articles
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch favorites error:", error);
      } finally {
        setIsLoading(false);
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
