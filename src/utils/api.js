import axios from 'axios';
import config from './config';

export const fetchFlightSearchResults = async (params) => {
  try {
    const response = await axios.get(
      `https://${config.API_HOST}/api/v1/flights/searchFlights?fromId=${params.fromId}&toId=${params.toId}&departDate=${params.departureDate}&adults=${params.adults}&cabinClass=${params.cabinClass}&currency_code=CAD`
      , {
      headers: {
        'x-rapidapi-key': config.API_KEY,
        'x-rapidapi-host': config.API_HOST,
      }});

    console.log('Search Results:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in SearchFlight API:', error);
    throw error;
  }
};

