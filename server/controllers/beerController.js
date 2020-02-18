const wrapAsync = require("../helpers/asyncErrorHandler");
const BeerServices = require("../services/beerServices");

const beerServices = new BeerServices();

module.exports = class BeerController {
  addBeer = wrapAsync(async function(req, res) {
    const message = await beerServices.beerAdd(req.body);
    return res.json(message);
  });

  deleteBeer = wrapAsync(async function(req, res) {
    const message = await beerServices.beerDelete(req.body);
    return res.json(message);
  });
};
