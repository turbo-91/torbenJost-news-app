import GlobalStyle from "@/styles/styles";
import Layout from "@/components/LayoutComp/LayoutComp";
import { useRouter } from "next/router";
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
    // Fetch favorites or any initial data here
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites"); // Example endpoint to fetch favorites
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
  }, []); // Empty dependency array means this effect runs only once on mount

  const toggleFavorite = async (article) => {
    const isCurrentlyFavorited = favorites.some(
      (fav) => fav._id === article._id
    );

    if (isCurrentlyFavorited) {
      const response = await fetch(`/api/favorites/${article._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav._id !== article._id));
      } else {
        console.error(`Error: ${response.status}`);
      }
    } else {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        setFavorites([...favorites, article]);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  };

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
