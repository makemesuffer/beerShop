const mongoose = require("mongoose");
const Users = require("../model/Users");

const User = mongoose.model("Users");

module.exports.login = (login, password) => {
  return Users.findOne({ login, password });
};

module.exports.create = data => {
  const user = new User({
    login: data.login,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    createdAt: new Date(),
    profilePicture: data.profilePicture || null,
    available: false
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

// TODO: перепиши эти три функции в одну

module.exports.findEmail = login => {
  return Users.findOne({ login });
};

module.exports.findPassword = password => {
  return Users.findOne({ password });
};

module.exports.findCode = code => {
  return Users.findOne({ resetCode: code });
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
