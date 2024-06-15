// ArticleCard.js

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

// bypass next/Image components domain restriction! Caution! Security concern.
const customLoader = ({ src }) => {
  return src;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArticleCard({ article, onFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();
  const { data: userData } = useSWR(session ? "/api/users" : null, fetcher);

  const handleFavoriteClick = async () => {
    if (!session) {
      alert("You need to be logged in to favorite articles");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "favorite", article }),
      });

      if (response.ok) {
        setIsFavorite(true);
        mutate("/api/users"); // Update user data cache
      } else {
        const errorData = await response.json();
        console.error("Failed to add article to favorites:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding article to favorites", error);
    }
  };

  return (
    <div className="article-card">
      <b>
        ********************************************************************************************************************
      </b>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <p>
        <strong>Source:</strong> {article.source.name}
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
      {isFavorite ? (
        <p>Added to favorites!</p>
      ) : (
        <button onClick={handleFavoriteClick}>Add to favorites</button>
      )}
    </div>
  );
}
