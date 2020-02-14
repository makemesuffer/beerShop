const wrapAsync = require("../helpers/asyncErrorHandler");
const imageServices = require("../services/imageServices");

exports.addImage = wrapAsync(async (req, res) => {
  const message = await imageServices.imageAdd(req.body);
  return res.json(message);
});

exports.deleteBeer = wrapAsync(async (req, res) => {
  const message = await imageServices.deleteImg(req.body);
  return res.json(message);
});
