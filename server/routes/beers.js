const router = require("express").Router();

const BeerController = require("../controllers/beerController");

const beerController = new BeerController();

router.put("/users/:userId/beers/:beerId", beerController.addBeer);

router.delete("/users/:userId/beers/:beerId", beerController.deleteBeer);

module.exports = router;
