const express = require("express");

const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("/image-delete", imageController.deleteImage);

router.post("/image-upload", imageController.uploadImage);

module.exports = router;
