const mongoose = require("mongoose");
// const Brews = require("../model/Brews");

const Brew = mongoose.model("Brews");

module.exports = class BrewRepository {
  create(data) {
    const brew = new Brew({
      createdAt: new Date(),
      location: data.location,
      ingredients: data.ingredients,
      brewingMethod: data.brewingMethod,
      brewName: data.brewName,
      images: data.images,
      impressions: data.impressions,
      brewType: data.brewType,
      rating: 0,
      author: data.author
    });
    return brew.save();
  }
};
