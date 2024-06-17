import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

// bypass next/Image components domain restriction! Caution! Security concern.
const customLoader = ({ src }) => {
  return src;
};

const Card = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  font-family: Garamond, Georgie, Times New Roman;
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #001233;
`;

const Description = styled.p`
  margin: 8px 0;
`;

const Author = styled.p`
  margin: 8px 0;
  font-weight: bold;
`;

const Source = styled.p`
  margin: 8px 0;
`;

const PublishedAt = styled.p`
  margin: 8px 0;
`;

const ReadMore = styled.a`
  display: inline-block;
  margin-top: 12px;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => (props.isfavorite ? "#ff0000" : "#0070f3")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    background-color: ${(props) => (props.isfavorite ? "#cc0000" : "#005bb5")};
  }
`;

export default function ArticleCard({
  article,
  isfavorite,
  onRemoveFromFavorites,
}) {
  const [localIsFavorite, setLocalIsFavorite] = useState(isfavorite);

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
    <Card>
      <FavoriteButton isfavorite={localIsFavorite} onClick={toggleFavorite}>
        {localIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </FavoriteButton>
      <Title>{article.title}</Title>
      <Description>{article.description}</Description>
      <Author>
        <strong>Author:</strong> {article.author}
      </Author>
      {/* <Source>
        <strong>Source:</strong> {article.source.name}
      </Source> */}
      <PublishedAt>
        <strong>Published At:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </PublishedAt>
      {article.urlToImage && (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          layout="responsive"
          width={700} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      )}
      <ReadMore href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </ReadMore>
    </Card>
  );
}
