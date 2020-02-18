const db = require("../loaders/db");

module.exports = class BeerServices {
  async beerAdd(data) {
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
  }

  async beerDelete(data) {
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
  }
};
