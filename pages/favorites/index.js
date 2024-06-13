import React from "react";
import Link from "next/link";

export default function Favorites() {
  return (
    <>
      <h1>favorites</h1>
      <Link href={`/login`}>back</Link>
    </>
  );
}
