import React from "react";
import styled from "styled-components";
import LoginButton from "@/components/LoginButton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import FavoritesList from "@/components/FavoritesList/FavoritesList";
import { LogOut } from "lucide-react";

const Title = styled.h2`
  font-family: Bookman, Garamond, Georgia;
  font-size: 1.3em;
  margin-bottom: 8px;
  color: #001233;
  text-align: justify;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
  flex-direction: column;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  width: 100%;
  margin-bottom: 20px;
  position: relative; /* Ensure positioning context */
`;

const CircularImage = styled(Image)`
  border-radius: 50%;
  margin-right: 10px; /* Adjust if needed */
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    opacity: 80%;
  }
`;

export default function LoginPage({ favorites, setFavorites }) {
  const { data: session, status } = useSession();

  return (
    <>
      {" "}
      <Container>
        <LoginButton />
        {session && (
          <>
            <UserSection>
              <ImageSection>
                <CircularImage
                  src={session.user.image}
                  alt="User Avatar"
                  width={200}
                  height={200}
                />
                <LogoutButton onClick={() => signOut()}>
                  <LogOut color="#001233" size={35} strokeWidth={1} />
                </LogoutButton>
              </ImageSection>

              <FavoritesList
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </UserSection>
          </>
        )}
      </Container>
    </>
  );
}
