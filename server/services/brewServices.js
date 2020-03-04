const moment = require("moment");

const userRepository = require("../repositories/userRepository");
const brewRepository = require("../repositories/brewRepository");
const cloudinary = require("../inregration/cloudinaryLoader");

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

    const result = await brewRepository.create(brewData);

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

    const posts = await brewRepository
      .findAll()
      .populate("author", "firstName");

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
    return brewRepository.find("_id", id).populate("author", "firstName");
  }

  async messageAdd(data) {
    const { id, name, message, userId, img, commentId } = data;
    const comment = { id, payload: { commentId, userId, name, message, img } };
    await brewRepository.pushComment(comment);
    const brew = await brewRepository
      .getOneByID(id)
      .populate("author", "firstName");
    return {
      success: true,
      brew
    };
  }

  async deleteMessage(data) {
    const { id, commentId } = data;
    const comment = { id, payload: { commentId } };
    await brewRepository.deleteComment(comment);
    const brew = await brewRepository
      .getOneByID(id)
      .populate("author", "firstName");
    return {
      success: true,
      brew
    };
  }

  async likeBrew(data) {
    const { id, userId } = data;

    const brew = await brewRepository
      .find("_id", id)
      .populate("author", "login");

    const user = await userRepository.find("_id", userId);

    if (user.login === brew.author.login) {
      return {
        id,
        message: "Can't like or dislike your own brew",
        status: 400,
        rating: brew.likes - brew.dislikes
      };
    }

    if (brew.likedBy.includes(user.login)) {
      return {
        id,
        message: "You already liked this post",
        status: 400,
        rating: brew.likes - brew.dislikes
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      brew.dislikes -= 1;
      const arrayIndex = brew.dislikedBy.indexOf(user.login);
      brew.dislikedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        message: "You removed dislike from post",
        rating: brew.likes - brew.dislikes,
        status: 200
      };
    }

    brew.likes += 1;
    brew.likedBy.push(user.login);
    await brew.save();

    return {
      message: "Post was liked",
      rating: brew.likes - brew.dislikes,
      status: 200
    };
  }

  async dislikeBrew(data) {
    const { id, userId } = data;

    const brew = await brewRepository
      .find("_id", id)
      .populate("author", "login");

    const user = await userRepository.find("_id", userId);

    if (user.login === brew.author.login) {
      return {
        id,
        rating: brew.likes - brew.dislikes,
        message: "Can't like or dislike your own brew",
        status: 400
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      return {
        id,
        rating: brew.likes - brew.dislikes,
        message: "You already disliked this post",
        status: 400
      };
    }

    if (brew.likedBy.includes(user.login)) {
      brew.likes -= 1;
      const arrayIndex = brew.likedBy.indexOf(user.login);
      brew.likedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        message: "You removed like from post",
        rating: brew.likes - brew.dislikes,
        status: 200
      };
    }

    brew.dislikes += 1;
    brew.dislikedBy.push(user.login);
    await brew.save();

    return {
      message: "Post was disliked",
      rating: brew.likes - brew.dislikes,
      status: 200
    };
  }
};
