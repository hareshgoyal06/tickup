const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const filterStockDataByRange = (data, range) => {
    const now = new Date();
    const cutoffDate = new Date();
  
    switch (range) {
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1m':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return data; // No filtering if range is not provided
    }
  
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };


  app.get('/api/stocks/:symbol', async (req, res) => {
    try {
      const { symbol } = req.params;
      const { range } = req.query;
  
      // Fetch historical data from Polygon
      const polygonResponse = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2020-01-01/2025-01-01?apiKey=${POLYGON_API_KEY}`
      );
      const stockData = polygonResponse.data.results.map(item => ({
        date: new Date(item.t).toISOString().split('T')[0], // Convert timestamp to YYYY-MM-DD
        value: item.c, // Closing price
      }));
  
      // Fetch current price data from Alpha Vantage
      const alphaResponse = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_API_KEY}`
      );
      const currentPriceData = alphaResponse.data['Global Quote'];
  
      if (!currentPriceData) {
        return res.status(404).json({ error: 'No current price data found for this symbol.' });
      }
  
      const currentPrice = parseFloat(currentPriceData['05. price']);
  
      // Filter the historical data based on the selected time range
      const filteredData = filterStockDataByRange(stockData, range);
  
      // Send the combined data as a response
      res.json({
        symbol: symbol.toUpperCase(),
        currentPrice: currentPrice,
        historicalData: filteredData,
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Failed to fetch stock data' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
