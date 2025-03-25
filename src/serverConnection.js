import axios from 'axios';

const connectToServer = async () => {
  const url = 'http://localhost:5049/weatherforecast';
  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await axios.get(url);
      console.log('Connected to server:', response.data);
      return response.data;
    } catch (error) {
      attempts += 1;
      console.error(`Connection attempt ${attempts} failed:`, error.message);
      if (attempts < maxRetries) {
        console.log('Retrying connection...');
      } else {
        console.error('Max retries reached. Could not connect to server.');
        throw error;
      }
    }
  }
};

export { connectToServer };
