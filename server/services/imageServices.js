const cloudinary = require("cloudinary").v2;

const db = require("../loaders/db");
const config = require("../config");
const Users = require("../model/Users");

const cloudinaryConfig = config.cloudinary;

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.cloudKey,
  api_secret: cloudinaryConfig.cloudSecret
});

module.exports = class ImageServices {
  async imageAdd(data) {
    const { id, img } = data;
    const image = await cloudinary.uploader.upload(img);
    await db.Base.update(Users, {
      _id: id,
      action: { profilePicture: image.url }
    });

    return {
      success: true,
      message: "Successfully uploaded"
    };
  }

  async deleteImg(data) {
    const { id } = data;
    await db.Base.update(Users, {
      _id: id,
      action: { profilePicture: null }
    });

    return {
      success: true,
      message: "Successfully deleted"
    };
  }
};
