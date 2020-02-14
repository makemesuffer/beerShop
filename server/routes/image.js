const router = require("express").Router();

const imageController = require("../controllers/imageController");

router.post("/add-image", imageController.addImage);

router.post("/delete-image", imageController.deleteBeer);

module.exports = router;
