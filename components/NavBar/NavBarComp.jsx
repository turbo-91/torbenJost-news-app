import React from "react";
import Link from "next/link";

export default function NavBarComp() {
  return (
    <footer className="nav-bar">
      <Link href={`/`}>Top Headlines //</Link>
      <Link href={`/search`}> Search //</Link>
      <Link href={`/login`}> Login</Link>
    </footer>
  );
}
