const router = require("express").Router();

const ImageController = require("../controllers/imageController");

const imageController = new ImageController();

router.put("/users/:userId/images", imageController.addImage);

router.delete("/users/:userId/images/:imgId", imageController.deleteBeer);

module.exports = router;
