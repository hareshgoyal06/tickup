const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
