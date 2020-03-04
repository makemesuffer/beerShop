const wrapAsync = require("../helpers/asyncErrorHandler");
const ImageServices = require("../services/imageServices");

const imageServices = new ImageServices();

module.exports = class ImageController {
  addImage = wrapAsync(async function(req, res) {
    const message = await imageServices.imageAdd(req.body);
    return res.json(message);
  });

  deleteBeer = wrapAsync(async function(req, res) {
    console.log(req.params);
    const message = await imageServices.deleteImg(req.params);
    return res.json(message);
  });
};
