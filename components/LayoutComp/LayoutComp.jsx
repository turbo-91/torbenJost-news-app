// components/Layout.js
import React from "react";
import Head from "next/head";
import HeaderComp from "../HeaderComp/Header";
import NavBarComp from "../NavBar/NavBarComp";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>NEWS APP</title>
      </Head>
      <HeaderComp />
      <main>{children}</main>
      <NavBarComp />
    </div>
  );
};

export default Layout;
