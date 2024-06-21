import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import githubLogo from "/public/GitHub_Logo.png";
import githubMark from "public/github-mark.png";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Hey there {session.user.name}! <br />
        <p>Your userId is {session.user.userId}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Log in to your account. <br />
      <button onClick={() => signIn("github")}>
        <Image
          src={githubMark}
          alt="GitHub Logo"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
        <Image
          src={githubLogo}
          alt="GitHub Logo"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
      </button>
    </>
  );
}
