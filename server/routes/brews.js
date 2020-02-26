const router = require("express").Router();

const BrewController = require("../controllers/brewController");

const brewController = new BrewController();

router.post("/add-brew", brewController.addBrew);

router.get("/brews", brewController.findBrew);

module.exports = router;
