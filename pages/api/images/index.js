import { DbService } from "@/services/DbService";

export default async function handler(req, res) {
  const { getImages, createImage } = DbService;

  switch (req.method) {
    case "GET":
      res.status(200).json(await getImages());
      break;

    case "POST":
      const newImage = await createImage(req.body.fileData);
      res.status(201).json(newImage);
      break;
  }
  res.status(200).end();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};
