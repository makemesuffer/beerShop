const userRepository = require("../repositories/userRepository");

const BaseService = require("./baseService");

class BeerServices extends BaseService {
  async beerAdd(data) {
    const { userId, beerId } = data;
    return this.add({ id: userId, param: "beerList", payload: beerId });
  }

  async beerDelete(data) {
    const { userId, beerId } = data;
    return this.delete({ id: userId, param: "beerList", payload: beerId });
  }
}

module.exports = new BeerServices(userRepository);
