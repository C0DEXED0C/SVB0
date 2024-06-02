import axios from 'axios';

const API_BASE_URL = 'https://data.lynxcrypto.app/api/v1/assets';

export async function fetchRealTimeData(tokenMint: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tokenMint}`, {
      headers: {
        'Authorization': `Bearer ${process.env.LYNX_API_KEY}` // Replace with your actual API key
      }
    });
    return response.data.data[0].priceUsd;
  } catch (error) {
    console.error('Error fetching market data', error);
    return null;
  }
}
