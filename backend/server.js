const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * ✅ Route 1: Get current stock data
 * Example: /api/stocks/AAPL
 */
app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Fetch current stock data
    const stockData = await yahooFinance.quote(symbol);

    if (!stockData) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    res.json({
      symbol: stockData.symbol,
      name: stockData.shortName,
      currentPrice: stockData.regularMarketPrice,
      dayHigh: stockData.regularMarketDayHigh,
      dayLow: stockData.regularMarketDayLow,
      openPrice: stockData.regularMarketOpen,
      previousClose: stockData.regularMarketPreviousClose,
    });
  } catch (error) {
    console.error('Error fetching current stock data:', error);
    res.status(500).json({ error: 'Failed to fetch current stock data' });
  }
});

/**
 * ✅ Route 2: Get historical stock data
 * Example: /api/stocks/AAPL/historical?from=2020-01-01&to=2023-01-01
 */
app.get('/api/stocks/:symbol/historical', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    // Fetch historical stock data
    const historicalData = await yahooFinance.historical(symbol, {
      period1: from || '2020-01-01',
      period2: to || new Date().toISOString().split('T')[0],
      interval: '1d',
    });

    if (!historicalData || historicalData.length === 0) {
      return res.status(404).json({ error: 'No historical data found' });
    }

    res.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    res.status(500).json({ error: 'Failed to fetch historical stock data' });
  }
});

/**
 * ✅ Route 3: Search for stocks by symbol
 * Example: /api/stocks/search?query=apple
 */
app.get('/api/stocks/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Fetch search results
    const searchResults = await yahooFinance.search(query);

    if (!searchResults.quotes || searchResults.quotes.length === 0) {
      return res.status(404).json({ error: 'No search results found' });
    }

    res.json(searchResults.quotes);
  } catch (error) {
    console.error('Error searching for stocks:', error);
    res.status(500).json({ error: 'Failed to search for stocks' });
  }
});

/**
 * ✅ Route 4: Get stock recommendations
 * Example: /api/stocks/AAPL/recommendations
 */
app.get('/api/stocks/:symbol/recommendations', async (req, res) => {
  try {
    const { symbol } = req.params;

    // Fetch stock recommendations
    const recommendations = await yahooFinance.recommendationsBySymbol(symbol);

    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ error: 'No recommendations found' });
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching stock recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch stock recommendations' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
