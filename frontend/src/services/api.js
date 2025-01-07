import axios from 'axios';

export const getMessage = async () => {
  try {
    const response = await axios.get('/api');
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};
