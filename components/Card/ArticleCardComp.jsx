import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const customLoader = ({ src }) => {
  return src;
};

const Card = styled.div`
  position: relative;
  background-color: #fff;
  padding: 1rem;
`;

const Title = styled.h2`
  font-family: Bookman, Garamond, Georgia;
  font-size: 1.3em;
  margin-bottom: 8px;
  color: #001233;
  text-align: justify;
`;

const Description = styled.p`
  color: black;
  margin: 8px 0;
  text-align: justify;
  font-size: 1em;
  font-family: Helvetica, Arial;
`;

const Author = styled.p`
  margin: 8px 0;
  color: black;
  font-family: Helvetica, Arial;
`;

const PublishedAt = styled.p`
  margin: 8px 0;
  color: black;
  font-family: Helvetica, Arial;
`;

const FavoriteButton = styled.button`
  background-color: ${({ isFavorite }) => (isFavorite ? "#ff0000" : "#11009e")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 12px;
  font-family: Helvetica, Arial;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledStrong = styled.strong`
  color: #001233;
`;

export default function ArticleCard({ article, favorites, toggleFavorite }) {
  const isFavorite = favorites.some((fav) => fav._id === article._id);

  const handleToggleFavorite = async () => {
    await toggleFavorite(article);
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

      <FavoriteButton isFavorite={isFavorite} onClick={handleToggleFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"}
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
      <Link href={article.url} style={{ textDecoration: "none" }}>
        <PublishedAt>
          <StyledStrong>Source:</StyledStrong> {article.source.name}
        </PublishedAt>
      </Link>
    </Card>
  );
}
