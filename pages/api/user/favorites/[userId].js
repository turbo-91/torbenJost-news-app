import dbConnect from "@/db/connect";
import Favorite from "@/db/models/Favorite";

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    await dbConnect();

    const userFavorites = await Favorite.find({ userId });

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log(error);
  }
}
