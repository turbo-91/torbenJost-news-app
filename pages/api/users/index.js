// api/users/index.js

import dbConnect from "@/db/connect";
import User from "@/db/models/User.js";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();

  const { method } = request;

  if (method === "GET") {
    try {
      const users = await User.find();
      response.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users", error);
      response.status(500).json({ error: "Server error" });
    }
  } else if (method === "POST") {
    try {
      const { action, article } = request.body;

      if (action === "favorite" && article) {
        const session = await getSession();
        if (!session) {
          return response.status(401).json({ error: "Unauthorized" });
        }

        const userId = session.userId;

        // Check if article already exists in favorites to avoid duplication
        const user = await User.findById(userId);
        if (user.favoriteArticles.includes(article._id)) {
          return response
            .status(400)
            .json({ error: "Article already favorited" });
        }

        await User.findByIdAndUpdate(userId, {
          $addToSet: { favoriteArticles: article._id },
        });

        response.status(201).json({ status: "added favorite article" });
      } else {
        response.status(400).json({ error: "Invalid request" });
      }
    } catch (error) {
      console.error("Error adding article to favorites", error);
      response.status(500).json({ error: "Server error" });
    }
  } else {
    response.setHeader("Allow", ["GET", "POST"]);
    response.status(405).end(`Method ${method} Not Allowed`);
  }
}
