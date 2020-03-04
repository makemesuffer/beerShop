const router = require("express").Router();

const BrewController = require("../controllers/brewController");

const brewController = new BrewController();

router.post("/brew", brewController.addBrew);

router.get("/brews", brewController.findBrew);

router.get("/brews/:id", brewController.findSingleBrew);

router.put("/likeBrew", brewController.likeBrew);

router.put("/dislikeBrew", brewController.dislikeBrew);

router.put("/brews/:id/messages/:commentId", brewController.addMessage);

router.delete("/brews/:id/messages/:commentId", brewController.deleteMessage);

module.exports = router;
