const express = require("express");
const router = express.Router();

const uplaod = require('../controller/upload.controller')
const getimage=require('../controller/upload.controller')

router.post("/images",uplaod)
router.get('/images',getimage)
