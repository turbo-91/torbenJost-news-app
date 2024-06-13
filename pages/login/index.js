import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1>User Area</h1>
      <LoginButton />
      {session && (
        <>
          <Link href={`/favorites`}>See your favorite articles</Link>
        </>
      )}
    </>
  );
}
