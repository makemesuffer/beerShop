const router = require("express").Router();

const BrewController = require("../controllers/brewController");

const brewController = new BrewController();

router.post("/add-brew", brewController.addBrew);

router.get("/brews", brewController.findBrew);

router.get("/brews/:id", brewController.findSingleBrew);

router.post("/brews/rating", brewController.changeRating);

module.exports = router;
