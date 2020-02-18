const router = require("express").Router();

const BeerController = require("../controllers/beerController");

const beerController = new BeerController();

router.post("/add-beer", beerController.addBeer);

router.post("/delete-beer", beerController.deleteBeer);

module.exports = router;
