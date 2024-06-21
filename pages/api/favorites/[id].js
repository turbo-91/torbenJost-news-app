import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(favorite);
  }
  if (request.method === "DELETE") {
    await Favorite.findByIdAndDelete(id);

    response.status(200).json({ status: "Favorite successfully deleted." });
  }
}
