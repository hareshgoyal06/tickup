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

export const getOpenPrice = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/opening`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getHistoricalStockData = async (symbol: string, period: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/historical`, {
      params: { period },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical stock data:', error);
    throw error;
  }
};

export const getNews = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getSentiment = async (symbol: string) => {
  try {
    const response = await axios.get(`/api/stocks/${symbol}/sentiment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sentiment data:', error);
    throw error;
  }
};