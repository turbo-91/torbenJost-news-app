import dbConnect from "../../../db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(request, response) {
  await dbConnect();
  const { _id } = request.query;

  if (request.method === "GET") {
    const faveArticle = await Favorite.findById(_id);

    if (!faveArticle) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(faveArticle);
  }

  if (request.method === "DELETE") {
    await Favorite.findByIdAndDelete(_id);

    response.status(200).json({ status: "Favorite successfully deleted." });
  }
}
