const cloudinary = require("cloudinary").v2;

const db = require("../loaders/db");
const config = require("../config");

const cloudinaryConfig = config.cloudinary;

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.cloudKey,
  api_secret: cloudinaryConfig.cloudSecret
});

exports.imageAdd = async data => {
  const { id, img } = data;
  const image = await cloudinary.uploader.upload(img);
  await db.Users.update({ _id: id, action: { profilePicture: image.url } });

  return {
    success: true,
    message: "Successfully uploaded"
  };
};

exports.deleteImg = async data => {
  const { id } = data;
  await db.Users.update({ _id: id, action: { profilePicture: null } });

  return {
    success: true,
    message: "Successfully deleted"
  };
};
