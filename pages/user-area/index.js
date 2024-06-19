import React from "react";
import styled from "styled-components";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Headline = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  text-align: center;
`;

const StyledLink = styled.a`
  display: block;
  margin-top: 20px;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  const { data: session, status } = useSession();

  return (
    <Container>
      <Headline>User Area</Headline>
      <Content>
        <LoginButton />
        {session && (
          <Link href={`/favorites`}>
            <StyledLink>See your favorite articles</StyledLink>
          </Link>
        )}
      </Content>
    </Container>
  );
}
