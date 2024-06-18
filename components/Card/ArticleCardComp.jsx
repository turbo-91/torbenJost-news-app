import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// bypass next/Image components domain restriction! Caution! Security concern.
const customLoader = ({ src }) => {
  return src;
};

const Card = styled.div`
  position: relative;
  background-color: #fff;
`;

const Title = styled.h2`
  font-family: Garamond, Georgie, Times New Roman;
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #001233;
  text-align: justify;
`;

const Description = styled.p`
  color: black;
  margin: 8px 0;
  text-align: justify;
`;

const Author = styled.p`
  margin: 8px 0;
  color: black;
`;

const Source = styled.p`
  color: black;
  margin: 8px 0;
`;

const PublishedAt = styled.p`
  color: black;
  margin: 8px 0;
`;

const FavoriteButton = styled.button`
  background-color: ${(props) => (props.isfavorite ? "#ff0000" : "#11009e")};
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

const StyledStrong = styled.strong`
  color: #001233;
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
      {article.urlToImage ? (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          layout="responsive"
          width={700} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      ) : (
        <Image
          unoptimized={customLoader}
          src="https://cdn.pixabay.com/photo/2017/09/18/17/32/smilie-2762568_1280.png"
          alt="Default Image"
          layout="responsive"
          width={700} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      )}

      <FavoriteButton isfavorite={localIsFavorite} onClick={toggleFavorite}>
        {localIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </FavoriteButton>
      <Link href={article.url} style={{ textDecoration: "none" }}>
        <Title>{article.title}</Title>
      </Link>
      <Link href={article.url} style={{ textDecoration: "none" }}>
        <Description>{article.description}</Description>
      </Link>
      <Link href={article.url} style={{ textDecoration: "none" }}>
        <Author>
          <StyledStrong>Author:</StyledStrong> {article.author}
        </Author>
      </Link>
      <Link href={article.url} style={{ textDecoration: "none" }}>
        <PublishedAt>
          <StyledStrong>Published At:</StyledStrong>{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </PublishedAt>
      </Link>
      {/* <Source>
        <strong>Source:</strong> {article.source.name}
      </Source> */}
    </Card>
  );
}
