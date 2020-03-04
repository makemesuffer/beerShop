const userRepository = require("../repositories/userRepository");
const cloudinary = require("../inregration/cloudinaryLoader");

module.exports = class ImageServices {
  async imageAdd(data) {
    const { userId, img } = data;
    const image = await cloudinary.uploader.upload(img);
    await userRepository.update({
      _id: userId,
      action: { profilePicture: image.url }
    });

    return {
      success: true,
      message: "Successfully uploaded"
    };
  }

  async deleteImg(data) {
    const { userId, imgId } = data;
    await cloudinary.uploader.destroy(imgId);
    await userRepository.update({
      _id: userId,
      action: { profilePicture: null }
    });

    return {
      success: true,
      message: "Successfully deleted"
    };
  }
};
