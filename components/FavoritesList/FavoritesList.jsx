import React, { useState, useEffect } from "react";
import ArticleCard from "../Card/ArticleCardComp";

const FavoritesList = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
    const getFavoriteArticles = () => {
      const articles = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Check if the key is "nextauth.message" or undefined, skip if true
        if (key === "nextauth.message" || key === "undefined") {
          continue;
        }
        try {
          const article = JSON.parse(localStorage.getItem(key));
          articles.push(article);
        } catch (error) {
          console.error("Error parsing article from localStorage:", error);
        }
      }
      setFavoriteArticles(articles);
    };

    // Ensure localStorage is available before trying to access it
    if (typeof window !== "undefined") {
      getFavoriteArticles();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleRemoveFromFavorites = (removedArticle) => {
    // Remove article from localStorage
    localStorage.removeItem(removedArticle.title);

    // Update state to reflect removal
    setFavoriteArticles((prevArticles) =>
      prevArticles.filter((article) => article.title !== removedArticle.title)
    );
  };

  return (
    <div>
      {favoriteArticles.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favoriteArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            isfavorite={
              localStorage.getItem(article.title) === JSON.stringify(article)
            }
            onRemoveFromFavorites={() => handleRemoveFromFavorites(article)}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesList;
