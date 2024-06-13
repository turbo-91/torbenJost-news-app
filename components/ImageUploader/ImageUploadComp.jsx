import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { onChange, onSubmit, uploadFile } from "./functions";

export function ImageUploader() {
  const [fileData, setFileData] = useState();
  const { trigger } = useSWRMutation("/api/images", uploadFile);

  return (
    <>
      <form onSubmit={(event) => onSubmit(event, fileData, trigger)}>
        <label htmlFor="file">File</label>
        <input
          type="file"
          name="file"
          id=""
          onChange={(event) => onChange(event, setFileData)}
        />
        <button>Upload</button>
      </form>
    </>
  );
}
