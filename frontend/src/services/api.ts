import axios from 'axios';

// Function to fetch stock data from the backend
export const getStockData = async (symbol: string, range: string = '3y') => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}`, {
      params: { range },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
