import React from "react";
import Link from "next/link";
import FavoritesList from "@/components/FavoritesList/FavoritesList";

export default function Favorites() {
  return (
    <>
      <h1>favorites</h1>
      <Link href={`/login`}>back</Link>
      <FavoritesList />
      <Link href={`/login`}>back</Link>
    </>
  );
}
