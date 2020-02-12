const db = require("../loaders/db");

exports.beerAdd = async data => {
  const { id, userId } = data;
  const payload = {
    id,
    userId
  };
  await db.Users.addBeer(payload);
  return {
    success: true,
    message: "beer added"
  };
};

exports.beerDelete = async data => {
  const { id, userId } = data;
  const payload = {
    id,
    userId
  };
  await db.Users.deleteBeer(payload);
  return {
    success: true,
    message: "beer deleted"
  };
};
