const mongoose = require("mongoose");

const BrewSchema = mongoose.Schema({
  createdAt: { type: Date },
  location: { type: String },
  brewName: { type: String },
  ingredients: { type: mongoose.Schema.Types.Mixed },
  brewingMethod: { type: mongoose.Schema.Types.Mixed },
  images: { type: [String] },
  impressions: { type: String },
  brewType: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: { type: [String] },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: [String] },
  comments: { type: [Object] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

const Brew = mongoose.model("Brews", BrewSchema);

module.exports = Brew;
