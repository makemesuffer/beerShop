const router = require("express").Router();

const ImageController = require("../controllers/imageController");

const imageController = new ImageController();

router.post("/add-image", imageController.addImage);

router.post("/delete-image", imageController.deleteBeer);

module.exports = router;
