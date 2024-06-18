import React from "react";
import styled from "styled-components";
import Image from "next/image";
import newsAppLogo from "/public/news-app-logo.png";

// Styled components
const Header = styled.header`
  margin-top: 20px;
  width: 100%;
  height: 10vh;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  //   overflow: hidden;
`;

export default function HeaderComp() {
  return (
    <Header>
      <LogoContainer>
        <Image
          src={newsAppLogo}
          alt="News App Logo"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      </LogoContainer>
    </Header>
  );
}
