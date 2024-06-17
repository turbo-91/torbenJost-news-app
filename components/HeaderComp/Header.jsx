import React from "react";
import styled from "styled-components";

const Header = styled.h1`
  font-family: Garamond, Georgie, Times New Roman;
  font-size: 2rem;
  margin-bottom: 8px;
  text-align: center;
  color: #11009e;
`;

export default function HeaderComp() {
  return <Header>NEWS APP</Header>;
}
