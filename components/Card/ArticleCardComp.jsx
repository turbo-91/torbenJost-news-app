import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import { useSession } from "next-auth/react";

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
  color: black;
  margin: 8px 0;
  font-family: Helvetica, Arial;
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
function findFavoriteIdByUrl(favorites, article) {
  // Find the favorite object in favorites array that matches the current article's url
  const favorite = favorites.find((fav) => fav.url === article.url);
  // If favorite is found, return its _id property; otherwise, return null or handle as needed
  return favorite ? favorite._id : null;
}

export default function ArticleCard({ article, favorites, setFavorites }) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };
  const { mutate } = useSWR("/api/favorites");
  const { data: session } = useSession();

  const isFavorite = (article) => {
    return favorites.some((favorite) => favorite.url === article.url);
  };

  async function toggleFavorite() {
    const favoriteId = findFavoriteIdByUrl(favorites, article);
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
    if (!isFavorite(article)) {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleUserId),
      });

      if (response.ok) {
        await response.json();
        mutate();
        console.log("favorites state after mutate post", articles);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } else {
      console.log("favorites before delete", favorites);
      console.log("article before delete", article);
      const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await response.json();
        console.log("favorites state after delete post", articles);
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  }

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

      {session && (
        <FavoriteButton
          onClick={toggleFavorite}
          favorite={isFavorite(article).toString()}
        >
          {isFavorite(article) ? (
            <IconWrapper>
              <BookmarkCheck color="#FAF9F6" size={45} strokeWidth={1} />
            </IconWrapper>
          ) : (
            <IconWrapper>
              <Bookmark color="#FAF9F6" size={45} strokeWidth={1} />
            </IconWrapper>
          )}
        </FavoriteButton>
      )}
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
