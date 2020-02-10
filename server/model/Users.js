const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  login: { type: String, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  profilePicture: { type: String },
  available: { type: Boolean },
  createdAt: { type: Date },
  beerList: [{ type: Number }]
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
