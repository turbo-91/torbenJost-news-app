import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const faveArticles = await Favorite.find();
      if (!faveArticles) {
        return response.status(404).json({ status: "Not Found!" });
      }
      response.status(200).json(faveArticles);
    } catch (error) {
      console.error("Error in GET /", error);
      response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const favoriteData = request.body;
      await Favorite.create(favoriteData);
      response.status(201).json({ status: "Favorite created" });
    } catch (error) {
      console.error("Error in POST /", error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const { id } = request.query;
    try {
      const deletedFavorite = await Favorite.findByIdAndDelete(id);
      if (!deletedFavorite) {
        return response.status(404).json({ status: "Favorite not found" });
      }
      response.status(200).json({ status: "Favorite successfully deleted." });
    } catch (error) {
      console.error("Error in DELETE /", error);
      response.status(500).json({ error: error.message });
    }
  }
}
