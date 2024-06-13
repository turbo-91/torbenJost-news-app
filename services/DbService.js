import connectMongo from "../db/connect";
import { createFrontendImageFromDbImage } from "./ImageService";
import { Image } from "@/db/models/Image";

export const DbService = {
  async createImage({ originalFilename, size, mimetype, binaryData }) {
    await connectMongo();
    const newImage = await Image.create({
      originalFilename,
      size,
      mimetype,
      binaryData,
    });

    return createFrontendImageFromDbImage(newImage);
  },
  async getImages() {
    await connectMongo();
    return (await Image.find()).map((image) =>
      createFrontendImageFromDbImage(image)
    );
  },
};
