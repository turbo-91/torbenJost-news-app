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

export default function ArticleCard({ article, favorites, setFavorites }) {
  // bypass next/Image components domain restriction! Caution! Security concern.
  const customLoader = ({ src }) => {
    return src;
  };

  const { mutate } = useSWR("/api/favorites");
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
          src="https://cdn.pixabay.com/photo/2017/09/18/17/32/smilie-2762568_1280.png"
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
