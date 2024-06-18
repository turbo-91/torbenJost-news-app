import React from "react";
import styled from "styled-components";

// Styled components
const Header = styled.header`
  //   position: fixed;
  width: 100%;
  height: 10vh;
  top: 0;
  background-color: #343a40;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  //   z-index: 1000; // Ensures the header is on top of other content
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
`;

export default function HeaderComp() {
  return (
    <Header>
      <Title>News App</Title>
    </Header>
  );
}
