const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ✅ Route: Fetch stock data from the Python FastAPI service
app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.get('/api/stocks/:symbol/opening', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}/opening`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.get('/api/stocks/:symbol/historical', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period } = req.query; // e.g., '6mo', '1y', '2y'

    // Validate the period query parameter
    if (!period) {
      return res.status(400).json({ error: 'Period query parameter is required' });
    }

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}/historical?period=${period}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    res.status(500).json({ error: 'Failed to fetch historical stock data' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/api/stocks/:symbol/news', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}/news`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock news:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock news' });
  }
});



app.get('/api/stocks/:symbol/news', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}/news`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.get('/api/stocks/:symbol/sentiment', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Make a request to the FastAPI service
    const response = await axios.get(`http://localhost:8000/stock/${symbol}/sentiment`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

//http://localhost:8000/stock/AAPL/historical?period=6mo
//http://localhost:5000/api/stocks/AAPL/historical?period=6mo