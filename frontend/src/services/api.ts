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
