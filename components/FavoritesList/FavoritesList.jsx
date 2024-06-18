import React, { useState, useEffect } from "react";
import ArticleCard from "../Card/ArticleCardComp";
import useSWR from "swr";

const FavoritesList = ({ favorites, toggleFavorite }) => {
  const { data, isLoading } = useSWR("/api/favorites");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      {data.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        data.map((article, index) => (
          <ArticleCard
            key={article._id}
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
