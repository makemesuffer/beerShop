const moment = require("moment");

const userRepository = require("../repositories/userRepository");
const brewRepository = require("../repositories/brewRepository");
const BaseService = require("./baseService");
const cloudinary = require("../inregration/cloudinaryLoader");

class BrewServices extends BaseService {
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

  getAllReviews() {
    const yestada = moment()
      .subtract(1, "days")
      .format();
    return brewRepository
      .findAll()
      .populate("author", "firstName")
      .where("createdAt")
      .gt(yestada);
  }

  getSingleBrew(id) {
    return this.find(id).populate("author", "firstName"); // improved
  }

  async messageAdd(data) {
    const { id, name, message, userId, img, commentId } = data;
    const payload = { commentId, userId, name, message, img };
    await this.add({ id, param: "comments", payload });
    return this.find(id).populate("author", "firstName");
  } // improved

  async deleteMessage(data) {
    const { id, commentId } = data;
    await this.delete({ id, param: "comments", payload: { commentId } });
    return this.find(id).populate("author", "firstName");
  } // improved

  async likeBrew(data) {
    const { id, userId } = data;

    if (userId === null) {
      return {
        status: 400,
        message: "You have to be registered to like brews"
      };
    }

    const brew = await brewRepository
      .find("_id", id)
      .populate("author", "login");

    const user = await userRepository.find("_id", userId);

    if (user.login === brew.author.login) {
      return {
        id,
        message: "Can't like or dislike your own brew",
        status: 400,
        rating: brew.rating
      };
    }

    if (brew.likedBy.includes(user.login)) {
      return {
        id,
        message: "You already liked this post",
        status: 400,
        rating: brew.rating
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      brew.rating += 1;
      const arrayIndex = brew.dislikedBy.indexOf(user.login);
      brew.dislikedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        message: "You removed dislike from post",
        rating: brew.rating,
        status: 200
      };
    }

    brew.rating += 1;
    brew.likedBy.push(user.login);
    await brew.save();

    return {
      message: "Post was liked",
      rating: brew.rating,
      status: 200
    };
  }

  async dislikeBrew(data) {
    const { id, userId } = data;

    if (userId === null) {
      return {
        status: 400,
        message: "You have to be registered to like brews"
      };
    }
    const brew = await brewRepository
      .find("_id", id)
      .populate("author", "login");

    const user = await userRepository.find("_id", userId);

    if (user.login === brew.author.login) {
      return {
        id,
        rating: brew.rating,
        message: "Can't like or dislike your own brew",
        status: 400
      };
    }

    if (brew.dislikedBy.includes(user.login)) {
      return {
        id,
        rating: brew.rating,
        message: "You already disliked this post",
        status: 400
      };
    }

    if (brew.likedBy.includes(user.login)) {
      brew.rating -= 1;
      const arrayIndex = brew.likedBy.indexOf(user.login);
      brew.likedBy.splice(arrayIndex, 1);
      await brew.save();
      return {
        message: "You removed like from post",
        rating: brew.rating,
        status: 200
      };
    }

    brew.rating -= 1;
    brew.dislikedBy.push(user.login);
    await brew.save();

    return {
      message: "Post was disliked",
      rating: brew.rating,
      status: 200
    };
  }

  filterBrews(data) {
    const { brewType } = data;
    if (brewType === "All") {
      return brewRepository.findAll().populate("author", "firstName");
    }
    return brewRepository
      .findAllByValue("brewType", brewType)
      .populate("author", "firstName");
  }

  async filterTime(data) {
    const { whatTime } = data;

    const brews = await brewRepository.findAll().populate("author", "login");

    switch (whatTime) {
      case "day":
        return brews.filter(post => {
          return moment().diff(post.createdAt, "days") < 1;
        });
      case "week":
        return brews.filter(post => {
          return moment().diff(post.createdAt, "days") < 7;
        });
      case "month":
        return brews.filter(post => {
          return moment().diff(post.createdAt, "days") < 30;
        });
      case "year":
        return brews.filter(post => {
          return moment().diff(post.createdAt, "days") < 365;
        });
      default:
        return brews;
    }
  }
}
module.exports = new BrewServices(brewRepository);
