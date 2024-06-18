import mongoose from "mongoose";
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  source: {
    id: { type: String },
    name: { type: String },
  },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});
const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
