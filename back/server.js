const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors"); // Import cors

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

const apiKeys = [
  "c42711901b00e79841bb71702345719e",
  "262483bd904a81b091b2e27cbcfc0655",
  "5e4573cba51e730e43abbfdf9ed9b975",
  "cccd134cea3374b1ec72c38c08c0b0b0",
  "5aa107ade26d9f4076b8d60f0020d49b",
  "19ba45233fe86671685bdf936a24b931",
  "f44e40de3e5c0c5b6ec60df0730c10d6",
  "21161f524ff705577169d62f61047ff7",
  "c0c89ef92565d4cf7c7ffa0a013e7313",
  "f3366d9120bda80407791f48106ec000",
  "f5eca2647dfd717ee3c6541b48950600",
  "f47d87d5284e9b73dfe85379526ba0c9",
  "9a6a270b61f40c0e58d160cbb1c57131",
  "02d49e539ff86d6fa9aa0f549efc93a3",
  "b050b1fd76d5fb561c1fa00deeeea4d5",
  "8d30c21d048073535bd26cefff977b0c",
  "e3d886b55e36cf01a11c0c15b62353eb",
  "8902fd4b5be3cdf6f457d9404d52c16a",
  "07fef516f7504f5b2781c5c58b75a63d",
  "af6063b9faed6beb8bb0fec11951feaa",
  "03e7915a807c174eabdc070225bd7997",
  "97a895c7e212f394201ce0b775894703",
  "f46c28ada7aa5eb18007371f7c19bd41",
  "1abbcbbb11ed8fbb27bc3d71e698b76d",
  "b384bd91fb7fcb3a9657beac393cc9db",
  "7ddd34443e97cc9ad5d4e6fe6d2d5502",
  "c5492f9f3334045292514ace4409bf35",
  "9826c9f4968f4726aff2e843db493424",
  "2ccc83581cab1580034bd1d43219f421",
  "36c1d526b5750ae07a2de23109bedcda",
  "dda76b57b63a5a86e18a5e94e619a370",
  "0f569e49ec24d01e6abef9bd7f3aa3d2",
  "9b5236ded34b6ec08e2baf996f2e2604",
];

// Function to choose a random API key
function getRandomApiKey() {
  const randomIndex = crypto.randomInt(0, apiKeys.length);
  return apiKeys[randomIndex];
}

// Define a route to fetch stock data for the last 3 days
app.get("/stock-data", async (req, res) => {
  try {
    const apiKey = getRandomApiKey(); // Choose a random API key
    const symbol = req.query.symbol; // Use the query parameter or a default value
    const timeframe = req.query.timeframe;
    let apiUrl = "";
    if (timeframe === "day") {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`;
    } else {
      apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${symbol}?apikey=${apiKey}`;
    }

    const response = await axios.get(apiUrl);
    let stockData = "";
    if (timeframe === "day") {
      stockData = response.data.historical;
    } else {
      stockData = response.data;
    }
    res.json(stockData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
