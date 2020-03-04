const wrapAsync = require("../helpers/asyncErrorHandler");
const BeerServices = require("../services/beerServices");

const beerServices = new BeerServices();

module.exports = class BeerController {
  addBeer = wrapAsync(async function(req, res) {
    const message = await beerServices.beerAdd(req.params);
    return res.json(message);
  });

  deleteBeer = wrapAsync(async function(req, res) {
    const message = await beerServices.beerDelete(req.params);
    return res.json(message);
  });
};
