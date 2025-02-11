const express = require("express");
const router = express.Router();
const stockController = require("../controller/stockdata.controller");

router.get("/stocks", stockController.getStockData);

module.exports = router;
