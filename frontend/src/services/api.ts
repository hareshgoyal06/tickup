import axios from 'axios';

// Function to fetch current stock data from the backend
export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// Function to fetch historical stock data
export const getHistoricalData = async (symbol: string, from: string, to: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/historical`, {
      params: { from, to },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

// Function to fetch stock recommendations
export const getStockRecommendations = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock recommendations:', error);
    throw error;
  }
};
