// components/NavBar/NavBarComp.js
import React from "react";
import Link from "next/link";
import styled from "styled-components";

// Styled components
const NavBar = styled.footer`
  position: fixed;
  width: 100%;
  height: 10vh;
  bottom: 0;
  background-color: #343a40;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1000; // Ensures the navbar is on top of other content
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default function NavBarComp() {
  return (
    <NavBar>
      <NavLink href={`/`}>Top Headlines</NavLink>
      <NavLink href={`/search`}> Search</NavLink>
      <NavLink href={`/login`}> Login</NavLink>
    </NavBar>
  );
}
