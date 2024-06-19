import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const favorites = await Favorite.find();
    if (!favorites) {
      return response.status(404).json({ status: "Not Found!" });
    }
    response.status(200).json(favorites);
  }
}
