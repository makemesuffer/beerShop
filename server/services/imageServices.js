const db = require("../loaders/db");

exports.imageAdd = async data => {
  const { id, img } = data;
  await db.Users.update({ _id: id, action: { profilePicture: img } });

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
