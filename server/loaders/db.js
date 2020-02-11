const db = require("../repositories/dbRepository");

db.setUpConnection();

module.exports = db;
