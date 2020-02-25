const cloudinary = require("cloudinary").v2;
const moment = require("moment");

const db = require("../loaders/db");
const config = require("../config");
const Brews = require("../model/Brews");

const cloudinaryConfig = config.cloudinary;

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.cloudKey,
  api_secret: cloudinaryConfig.cloudSecret
});

module.exports = class BrewServices {
  async brewRegister(data) {
    const {
      location,
      ingredients,
      brewingMethod,
      brewName,
      images,
      impressions,
      brewType,
      author
    } = data;

    if (
      !location ||
      !ingredients ||
      !brewingMethod ||
      !brewName ||
      !images ||
      !impressions ||
      !brewType
    ) {
      return {
        success: false,
        error: "Please, fill everything",
        status: 406
      };
    }
    const newImages = images.map(image => {
      return cloudinary.uploader.upload(image).url;
    });

    const brewData = {
      location,
      ingredients,
      brewingMethod,
      brewName,
      images: newImages,
      impressions,
      brewType,
      author
    };

    const result = await db.Brew.create(brewData);

    if (result.location) {
      return {
        success: true,
        message: "Review was successfully added",
        status: 200
      };
    }

    return {
      success: false,
      message: "Unknown error met",
      status: 400
    };
  }

  async getAllReviews(data) {
    // day, week, month, year
    const { time } = data;

    const posts = await db.Base.findAll(Brews);

    switch (time) {
      case "day":
        return posts.filter(post => {
          return moment().diff(post.createdAt, "days") < 1;
        });
      case "week":
        return posts.filter(post => {
          return moment().diff(post.createdAt, "days") < 7;
        });
      case "month":
        return posts.filter(post => {
          return moment().diff(post.createdAt, "days") < 30;
        });
      case "year":
        return posts.filter(post => {
          return moment().diff(post.createdAt, "days") < 365;
        });
      default:
        return posts;
    }
  }
};