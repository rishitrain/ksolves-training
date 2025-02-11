const axios = require("axios");

const API_URL = "https://mocki.io/v1/05cb61d9-f3ce-4a83-aac0-083113622bbf";

const fetchStockData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    throw new Error("Failed to fetch stock data");
  }
};

module.exports = { fetchStockData };
