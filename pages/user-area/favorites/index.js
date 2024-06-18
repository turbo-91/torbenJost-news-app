import React from "react";
import FavoritesList from "@/components/FavoritesList/FavoritesList";
import Link from "next/link";

export default function Favorites() {
  return (
    <>
      <h1>favorites</h1>
      <Link href={`/user-area`}>back</Link>
      <FavoritesList />
    </>
  );
}
