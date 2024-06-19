import useSWR from "swr";
import ArticleCard from "../Card/ArticleCardComp";

const FavoritesList = ({ favorites, toggleFavorite, isFavorite }) => {
  // fetch favorites from database
  // const fetcher = async (url) => {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch data");
  //   }
  //   const data = await response.json();
  //   return data;
  // };
  // const { data, isLoading } = useSWR("/api/favorites", fetcher);
  // const favoriteArticles = data;

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (!data) {
  //   return;
  // }

  // next block

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favorites.map((article, index) => (
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
