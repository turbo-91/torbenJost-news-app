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
  if (request.method === "POST") {
    try {
      const favoriteData = request.body;
      await Favorite.create(favoriteData);

      response.status(201).json({ status: "Favorite created" });
    } catch (e) {
      console.error("Error in POST in /", e);
      response.status(400).json({ error: error.message });
    }
  }
}
