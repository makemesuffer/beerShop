const wrapAsync = require("../helpers/asyncErrorHandler");
const beerController = require("../services/beerServices");

exports.addBeer = wrapAsync(async (req, res) => {
  const message = await beerController.beerAdd(req.body);
  return res.json(message);
});

exports.deleteBeer = wrapAsync(async (req, res) => {
  const message = await beerController.beerDelete(req.body);
  return res.json(message);
});
