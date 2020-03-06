const mongoose = require("mongoose");

const Brews = require("../model/Brews");
const BaseRepository = require("./baseRepository");

const Brew = mongoose.model("Brews");

class BrewRepository extends BaseRepository {
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
}

module.exports = new BrewRepository(Brews);
