import axios from 'axios';

// Function to fetch real-time stock data from the backend
export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getHistoricalStockData = async (symbol: string, period: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/stocks/${symbol}/historical`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw error;
  }
};