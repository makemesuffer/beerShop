const userRepository = require("../repositories/userRepository");

module.exports = class BeerServices {
  async beerAdd(data) {
    const { id, userId } = data;
    const payload = {
      id,
      userId
    };
    await userRepository.addBeer(payload);
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
    await userRepository.deleteBeer(payload);
    return {
      success: true,
      message: "beer deleted"
    };
  }
};
