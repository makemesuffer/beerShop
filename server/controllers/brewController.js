const brewServices = require("../services/brewServices");
const wrapAsync = require("../helpers/asyncErrorHandler");

module.exports = class BrewController {
  addBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.brewRegister(req.body);
    return res.json(message);
  });

  findBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.getAllReviews();
    return res.json(message);
  });

  findSingleBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.getSingleBrew(req.params.id);
    return res.json(message);
  });

  addMessage = wrapAsync(async function(req, res) {
    const message = await brewServices.messageAdd(req.body);
    return res.json(message);
  });

  deleteMessage = wrapAsync(async function(req, res) {
    const message = await brewServices.deleteMessage(req.params);
    return res.json(message);
  });

  likeBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.likeBrew(req.body);
    return res.status(message.status).json(message);
  });

  dislikeBrew = wrapAsync(async function(req, res) {
    const message = await brewServices.dislikeBrew(req.body);
    return res.status(message.status).json(message);
  });

  filterBrews = wrapAsync(async function(req, res) {
    const message = await brewServices.filterBrews(req.params);
    return res.json(message);
  });

  filterTime = wrapAsync(async function(req, res) {
    const message = await brewServices.filterTime(req.params);
    return res.json(message);
  });
};
