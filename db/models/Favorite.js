import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  // id: { type: String },
  source: {
    id: { type: String },
    name: { type: String },
  },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, required: true },
  content: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
