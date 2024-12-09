
import axios from 'axios';
import config from './config'; 

// Function to fetch destination code based on location
export const fetchDestinationCode = async (location) => {
  try {
    const response = await axios.get(`https://${config.API_HOST}/api/v1/hotels/searchDestination`, {
      headers: {
        'X-Rapidapi-Key': config.API_KEY,
        'X-Rapidapi-Host': config.API_HOST,
      },
      params: {
        query: location,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching destination code:', error);
    throw error;
  }
};

// Function to fetch hotel data based on destination code
export const fetchHotelData = async (destinationCode, checkIn, checkOut, person) => {
  try {
    const response = await axios.get(`https://${config.API_HOST}/api/v1/hotels/searchHotels`, {
      headers: {
        'X-Rapidapi-Key': config.API_KEY,
        'X-Rapidapi-Host': config.API_HOST,
      },
      params: {
        dest_id: destinationCode,
        search_type: 'CITY',
        arrival_date: checkIn,
        departure_date: checkOut,
        adults: person,
        children_age: '0,17',
        room_qty: 1,
        page_number: 1,
        units: 'metric',
        temperature_unit: 'c',
        languagecode: 'en-us',
        currency_code: 'CAD',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    throw error;
  }
};




