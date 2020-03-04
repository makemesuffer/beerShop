const userRepository = require("../repositories/userRepository");
const cloudinary = require("../inregration/cloudinaryLoader");

module.exports = class ImageServices {
  async imageAdd(data) {
    const { id, img } = data;
    const image = await cloudinary.uploader.upload(img);
    await userRepository.update({
      _id: id,
      action: { profilePicture: image.url }
    });

    return {
      success: true,
      message: "Successfully uploaded"
    };
  }

  async deleteImg(data) {
    const { id, img } = data;
    const publicId = img
      .split("/")
      .pop()
      .split(".")
      .shift();
    await cloudinary.uploader.destroy(publicId);
    await userRepository.update({
      _id: id,
      action: { profilePicture: null }
    });

    return {
      success: true,
      message: "Successfully deleted"
    };
  }
};
