const router = require("express").Router();

const beerController = require("../controllers/beerController");

router.post("/add-beer", beerController.addBeer);

router.post("/delete-beer", beerController.deleteBeer);

module.exports = router;
