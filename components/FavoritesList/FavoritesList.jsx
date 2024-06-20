import useSWR from "swr";
import ArticleCard from "../Card/ArticleCardComp";
import { useSession } from "next-auth/react";

const FavoritesList = ({ favorites, toggleFavorite, isFavorite }) => {
  // fetch user favorites from database
  const { data: session } = useSession();
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  };
  const { data, isLoading, error } = useSWR(
    session ? `/api/user/favorites/${session.user?.userId}` : null,
    fetcher
  );

  const favoriteArticles = data;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  // next block

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesList;
