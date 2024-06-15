import Image from "next/image";
import { useState } from "react";

// bypass next/Image components domain restriction! Caution! Security concern.
const customLoader = ({ src }) => {
  return src;
};

export default function ArticleCard({
  article,
  isFavorite,
  onRemoveFromFavorites,
}) {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    const newFavoriteStatus = !localIsFavorite;
    setLocalIsFavorite(newFavoriteStatus);

    // Serialize the entire article object to store in localStorage
    if (newFavoriteStatus) {
      localStorage.setItem(article.title, JSON.stringify(article));
    } else {
      localStorage.removeItem(article.title);
      // Trigger removal from FavoritesList component
      if (typeof onRemoveFromFavorites === "function") {
        onRemoveFromFavorites();
      }
    }
  };

  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Published At:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
      {article.urlToImage && (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          width={700} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      )}
      <p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </p>
      <button onClick={toggleFavorite}>
        {localIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
