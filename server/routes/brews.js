const router = require("express").Router();

const BrewController = require("../controllers/brewController");

const brewController = new BrewController();

router.post("/add-brew", brewController.addBrew);

router.get("/brews", brewController.findBrew);

router.get("/brews/:id", brewController.findSingleBrew);

router.put("/likeBrew", brewController.likeBrew);

router.put("/dislikeBrew", brewController.dislikeBrew);

router.post("/brews/message", brewController.addMessage);

router.post("/brews/delete", brewController.deleteMessage);

module.exports = router;
