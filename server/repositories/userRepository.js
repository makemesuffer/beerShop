const mongoose = require("mongoose");
const Users = require("../model/Users");

const User = mongoose.model("Users");

module.exports.login = (login, password) => {
  return Users.findOne({ login, password });
};

module.exports.create = data => {
  const {
    login,
    password,
    firstName,
    lastName,
    profilePicture,
    birthDate,
    available
  } = data;
  const user = new User({
    login,
    password,
    firstName,
    lastName,
    birthDate,
    createdAt: new Date(),
    profilePicture: profilePicture || null,
    available
  });
  return user.save();
};

module.exports.update = object => {
  return Users.findOneAndUpdate({ _id: object._id }, { $set: object.action });
};

module.exports.getOneByID = id => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Users.findOne({ _id: id });
  }
};

module.exports.findEmail = login => {
  return Users.findOne({ login });
};

module.exports.addBeer = data => {
  return Users.findOneAndUpdate(
    { _id: data.userId },
    { $push: { beerList: data.id } }
  );
};

module.exports.deleteBeer = data => {
  return Users.findOneAndUpdate(
    { _id: data.userId },
    { $pull: { beerList: data.id } }
  );
};
