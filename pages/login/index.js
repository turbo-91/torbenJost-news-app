import { ImageUploader } from "@/components/ImageUploader/ImageUploadComp";
import LoginButton from "@/components/LoginButton";

import useSWR from "swr";

export default function LoginPage() {
  const { data: images = [], isLoading } = useSWR("/api/images");

  if (isLoading) {
    return "loading...";
  }
  return (
    <>
      <h1>User Area</h1>
      <LoginButton />
      {/* <ImageUploader /> */}
    </>
  );
}
