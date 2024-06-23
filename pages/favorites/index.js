import React from "react";
import FavoritesList from "@/components/FavoritesList/FavoritesList";
import Link from "next/link";
import styled from "styled-components";

const Title = styled.h2`
  font-family: Bookman, Garamond, Georgia;
  font-size: 1.3em;
  margin-top: 4vh;
  margin-bottom: 2vh;
  color: #001233;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  color: #001233;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #001233;
  text-decoration: none;
  margin-left: 0; /* Reset margin-left */
  margin-bottom: 10px; /* Optional: Add some bottom margin for spacing */

  &:hover {
    opacity: 80%;
  }
`;
export default function Favorites({ favorites, toggleFavorite, setFavorites }) {
  return (
    <Container favorites={favorites} setFavorites={setFavorites}>
      <Title>Your favorite Articles</Title>
      <FavoritesList favorites={favorites} setFavorites={setFavorites} />
      <Link href={`/user-area`}>
        <BackButton>Back</BackButton>
      </Link>
    </Container>
  );
}
