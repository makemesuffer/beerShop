const UserRepository = require("../repositories/userRepository");
const BrewRepository = require("../repositories/brewRepository");
const BaseRepository = require("../repositories/baseRepository");

const brew = new BrewRepository();
const user = new UserRepository();
const base = new BaseRepository();

module.exports.Brew = brew;
module.exports.Users = user;
module.exports.Base = base;
