import useSWR from "swr";
import ArticleCard from "../Card/ArticleCardComp";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const Paragraph = styled.p`
  color: black;
  margin: 8px 0;
  text-align: center;
  font-size: 1em;
  font-family: Helvetica, Arial, sans-serif;
`;

const FavoritesList = ({ favorites, setFavorites, toggleFavorite }) => {
  // initial fetch user favorites from database
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

  return (
    <div>
      {favorites.length === 0 ? (
        <Paragraph>No favorite articles yet.</Paragraph>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setFavorites={setFavorites}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesList;
