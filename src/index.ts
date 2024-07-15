import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import Price from './models/Price';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;
const finnhubApiKey = process.env.FINNHUB_API_KEY;

app.use(cors());
app.use(express.json()); // Enable JSON parsing for incoming requests

// Connect to MongoDB
 mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to fetch stock data from Finnhub API and save to MongoDB
const fetchStockData = async () => {
  const symbols = ['GOOG', 'MSFT', 'FB', 'AAPL', 'AMZN'];

  for (const symbol of symbols) {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`);
      const quote = response.data;
      console.log({quote})
      const priceData = new Price({
        symbol,
        price: quote.c,
      });
      await priceData.save();
    } catch (error) {
      console.error(error);
    }
  }
};

// Set an interval to fetch stock data every 30 seconds

setInterval(() => {
  fetchStockData();
}, 30 * 60 * 1000);

// GET endpoint to retrieve the latest 20 prices for a specific stock symbol
app.get('/prices/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const prices = await Price.find({ symbol }).sort({ timestamp: -1 }).limit(20);
  res.json(prices);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
