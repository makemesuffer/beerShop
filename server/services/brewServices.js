const cloudinary = require("cloudinary").v2;
const moment = require("moment");

const db = require("../loaders/db");
const config = require("../config");
const Brews = require("../model/Brews");
const Users = require("../model/Users");

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
      photos,
      impressions,
      brewType,
      author
    } = data;

    if (
      !location ||
      !ingredients ||
      !brewingMethod ||
      !brewName ||
      !photos ||
      !impressions ||
      !brewType
    ) {
      return {
        success: false,
        error: "Please, fill everything",
        status: 406
      };
    }

    let newImages;
    const promises = photos.map(async photo =>
      cloudinary.uploader.upload(photo)
    );

    await Promise.all(promises).then(images => {
      newImages = images.map(image => image.url);
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

  async getAllReviews() {
    // day, week, month, year, all
    /*
    const { time } = data;
    console.log(time);
     */

    const time = "all";

    const posts = await db.Base.findAll(Brews).populate("author", "firstName");

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

  getSingleBrew(id) {
    return db.Base.find(Brews, "_id", id).populate("author", "firstName");
  }

  async messageAdd(data) {
    const { id, name, message, userId, img } = data;
    if (await db.Base.find(Brews, "comments.userId", userId)) {
      return {
        success: false,
        message: "You can't leave comments twice, only 1 comment per user"
      };
    }
    const comment = { id, payload: { userId, name, message, img } };
    await db.Brew.pushComment(comment);
    return {
      success: true
    };
  }

  async deleteMessage(data) {
    const { id, userId } = data;
    const comment = { id, payload: { userId } };
    await db.Brew.deleteComment(comment);
    return {
      success: true
    };
  }

  async likeBrew(data) {
    const { id, userId } = data;

    const brew = await db.Base.find(Brews, "_id", id).populate(
      "author",
      "login"
    );

    const user = await db.Base.find(Users, "_id", userId);

    if (user.login === brew.author.login) {
      return {
        success: false,
        message: "Can't like or dislike your own brew"
      };
    }

    if (brew.likedBy.includes(user.login)) {
      return {
        success: false,
        message: "You already liked this post"
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      brew.dislikes -= 1;
      const arrayIndex = brew.dislikedBy.indexOf(user.login);
      brew.dislikedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        success: true,
        message: "You removed dislike from post"
      };
    }

    brew.likes += 1;
    brew.likedBy.push(user.login);
    await brew.save();

    return {
      success: true,
      message: "Post was liked"
    };
  }

  async dislikeBrew(data) {
    const { id, userId } = data;

    const brew = await db.Base.find(Brews, "_id", id).populate(
      "author",
      "login"
    );

    const user = await db.Base.find(Users, "_id", userId);

    if (user.login === brew.author.login) {
      return {
        success: false,
        message: "Can't like or dislike your own brew"
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      return {
        success: false,
        message: "You already disliked this post"
      };
    }

    if (brew.likedBy.includes(user.login)) {
      brew.likes -= 1;
      const arrayIndex = brew.likedBy.indexOf(user.login);
      brew.likedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        success: true,
        message: "You removed like from post"
      };
    }

    brew.dislikes += 1;
    brew.dislikedBy.push(user.login);
    await brew.save();

    return {
      success: true,
      message: "Post was disliked"
    };
  }
};
