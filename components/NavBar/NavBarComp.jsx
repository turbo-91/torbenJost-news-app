// components/NavBar/NavBarComp.js
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Newspaper, TextSearch, UserRound } from "lucide-react";
import { useRouter } from "next/router";

// Styled components
const NavBar = styled.footer`
  position: fixed;
  width: 100%;
  height: 8vh;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #001233;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between; // Distribute space evenly between NavLinks
  align-items: center;
  z-index: 1000; // Ensures the navbar is on top of other content
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  text-decoration: none;
  font-size: 0.7rem;
  flex: 1; // Make each NavLink take equal space
  text-align: center;

  ${({ active }) =>
    active &&
    `
      color: #001233;
      font-weight: bold;
    `}

  &:hover {
    opacity: 80%;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 4px; // Add some space between the icon and the text
`;

export default function NavBarComp() {
  const router = useRouter();
  return (
    <NavBar>
      <NavLink href={`/`} active={router.pathname === "/"}>
        <IconWrapper>
          <Newspaper color="#001233" strokeWidth={1} />
        </IconWrapper>
        Top Headlines
      </NavLink>
      <NavLink href={`/search`} active={router.pathname === "/search"}>
        <IconWrapper>
          <TextSearch color="#001233" strokeWidth={1} />
        </IconWrapper>
        Search
      </NavLink>
      <NavLink href={`/login`} active={router.pathname === "/login"}>
        <IconWrapper>
          <UserRound color="#001233" strokeWidth={1} />
        </IconWrapper>
        Login
      </NavLink>
    </NavBar>
  );
}
