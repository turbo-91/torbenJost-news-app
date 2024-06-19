import GlobalStyle from "@/styles/styles";
import Layout from "@/components/LayoutComp/LayoutComp";

import { SWRConfig } from "swr";
import { useState } from "react";
import { useEffect } from "react";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [favorites, setFavorites] = useState([]);

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

  const toggleFavorite = async (articleWithId) => {
    console.log("ich passiere");
    const isfavorite = favorites.some((fav) => fav.url === articleWithId.url);

    if (isfavorite) {
      const response = await fetch(
        `/api/favorites/${articleWithId.articleId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.url !== articleWithId.url));
      } else {
        console.error(`Error: ${response.status}`);
      }
    } else {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleWithId),
      });

      if (response.ok) {
        setFavorites([...favorites, articleWithId]);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  };

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
            <Component
              {...pageProps}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </Layout>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
