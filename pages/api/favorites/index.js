import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(request, response) {
  console.log("request", request);
  console.log("response", response);
  await dbConnect();

  if (request.method === "GET") {
    const faveArticles = await Favorite.find();
    if (!faveArticles) {
      return response.status(404).json({ status: "Not Found!" });
    }
    response.status(200).json(faveArticles);
  }
}
