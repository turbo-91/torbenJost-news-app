import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import newsAppThumbnail from "/public/news-app-thumbnail.png";

const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Card = styled.div`
  position: relative;
  background-color: #fff;
  padding: 1rem;
  overflow: hidden; /* Ensure the button doesn't overflow outside the card */
`;

const Title = styled.h2`
  font-family: Bookman, Garamond, serif;
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
  font-family: Helvetica, Arial, sans-serif;
`;

const Author = styled.p`
  margin: 8px 0;
  color: black;
  font-family: Helvetica, Arial;
  text-align: left; /* Align left */
`;

const PublishedAt = styled.p`
  color: black;
  margin: 8px 0;
  font-family: Helvetica, Arial;
  text-align: left; /* Align left */
`;

const FavoriteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const StyledStrong = styled.strong`
  color: #001233;
`;

export default function ArticleCardFaves({
  article,
  favorites,
  setFavorites,
  mutate,
}) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };

  // Data Fetching

  // const { mutate } = useSWR("/api/favorites");
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites && userId) {
      setIsFavorite(
        findFavoriteByUrl(favorites, article, userId) !== undefined
      );
    }
  }, [favorites, userId, article]);

  function findFavoriteByUrl(favorites, article, userId) {
    return favorites.find(
      (fav) => fav.url === article.url && fav.userId === userId
    );
  }

  async function toggleFavorite() {
    const favoriteWithAllIds = findFavoriteByUrl(favorites, article, userId);
    const {
      source: { id: sourceId, name: sourceName },
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt: content,
      __v,
    } = article;
    const articleUserId = {
      source: { id: sourceId, name: sourceName },
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt: content,
      __v,
      userId: session.user.userId,
    };

    if (!isFavorite) {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleUserId),
      });

      if (response.ok) {
        const newFavorite = await response.json();
        setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
        setIsFavorite(true);
        mutate();
      } else {
        console.error(`Error: ${response.status}`);
      }
    } else {
      const response = await fetch(`/api/favorites/${favoriteWithAllIds._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await response.json();

        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav._id !== favoriteWithAllIds._id)
        );
        setIsFavorite(false);
        mutate();
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  }

  return (
    <Card isFavorite={isFavorite}>
      {article.urlToImage ? (
        <Image
          unoptimized={customLoader}
          src={article.urlToImage}
          alt={article.title}
          layout="responsive"
          width={700}
          height={400}
        />
      ) : (
        <Image
          unoptimized={customLoader}
          src={newsAppThumbnail}
          alt="Default Image"
          layout="responsive"
          width={700}
          height={400}
        />
      )}

      {session && (
        <FavoriteButton onClick={toggleFavorite}>
          {isFavorite ? (
            <IconWrapper>
              <BookmarkCheck color="#FAF9F6" size={35} strokeWidth={1} />
            </IconWrapper>
          ) : (
            <IconWrapper>
              <Bookmark
                fill="#FAF9F6"
                color="#FAF9F6"
                size={35}
                strokeWidth={1}
              />
            </IconWrapper>
          )}
        </FavoriteButton>
      )}
      {article.title && (
        <Link href={article.url} style={{ textDecoration: "none" }} passHref>
          <Title>{article.title}</Title>
        </Link>
      )}
      {article.description && (
        <Link href={article.url} style={{ textDecoration: "none" }} passHref>
          <Description>{article.description}</Description>
        </Link>
      )}
      {article.author && (
        <Link href={article.url} style={{ textDecoration: "none" }} passHref>
          <Author>
            <StyledStrong>Author:</StyledStrong> {article.author}
          </Author>
        </Link>
      )}
      {article.publishedAt && (
        <Link href={article.url} style={{ textDecoration: "none" }} passHref>
          <PublishedAt>
            <StyledStrong>Published At:</StyledStrong>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </PublishedAt>
        </Link>
      )}
      {article.source.name && (
        <Link href={article.url} style={{ textDecoration: "none" }} passHref>
          <PublishedAt>
            <StyledStrong>Source:</StyledStrong> {article.source.name}
          </PublishedAt>
        </Link>
      )}
    </Card>
  );
}
