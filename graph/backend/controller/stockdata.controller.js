const stockService = require("../service/api");

const getStockData = async (req, res) => {
  try {
    const data = await stockService.fetchStockData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStockData };
