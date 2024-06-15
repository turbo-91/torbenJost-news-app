import mongoose from "mongoose";
const { Schema } = mongoose;

const articleSchema = new Schema({
  source: {
    id: { type: String },
    name: { type: String, required: true },
  },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, required: true },
  content: { type: String },
});

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
