const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage, getImages } = require("../controller/upload.controller");

const storage = multer.memoryStorage();
const fileupload = multer({ storage });

router.post("/images", fileupload.single("image"), uploadImage);
router.get("/images", getImages);
 
module.exports = router;
