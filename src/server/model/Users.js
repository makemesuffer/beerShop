const mongoose = require("mongoose");

// TODO: задать пользовательскую функцию проверки данных

const UserSchema = mongoose.Schema({
  login: { type: String, unique: true },
  password: { type: String, required: true },
  name: { firstName: String, lastName: String },
  birthDate: { type: Date, required: true },
  email: { type: String, lowercase: true, required: true },
  profilePicture: { type: String },
  createdAt: { type: Date }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
