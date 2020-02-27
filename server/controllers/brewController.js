const BrewServices = require("../services/brewServices");
const wrapAsync = require("../helpers/asyncErrorHandler");

const brewServices = new BrewServices();

module.exports = class BrewController {
  addBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.brewRegister(req.body);
    return res.json(message);
    // return res.status(message.status).json(message);
  });

  findBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.getAllReviews();
    return res.json(message);
    // return res.status(message.status).json(message);
  });

  findSingleBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.getSingleBrew(req.params.id);
    return res.json(message);
  });

  changeRating = wrapAsync(async function(req, res) {
    const message = await brewServices.ratingChange(req.body);
    return res.json(message);
  });
};
