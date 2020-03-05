const userRepository = require("../repositories/userRepository");

module.exports = class BeerServices {
  async beerAdd(data) {
    const { beerId, userId } = data;
    const payload = {
      beerId,
      userId
    };
    await userRepository.addBeer(payload);
    return {
      success: "true"
    };
  }

  // TODO: baseService

  async beerDelete(data) {
    const { beerId, userId } = data;
    const payload = {
      beerId,
      userId
    };
    await userRepository.deleteBeer(payload);
    return {
      success: "true"
    };
  }
};
