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

export const searchLocation = async (locationName) => {
  try {
    const response = await axios.get(
      `https://${config.API_HOST_RES}/api/v1/restaurant/searchLocation?query=${encodeURIComponent(locationName)}`,
      {
        headers: {
          'x-rapidapi-key': config.API_KEY_RES,
          'x-rapidapi-host': config.API_HOST_RES,
        },
      }
    );

    if (response.data.status && response.data.data.length > 0) {
      return response.data.data[0].locationId;
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching locationId:', error);
    throw error;
  }
};

export const searchRestaurants = async (locationId) => {
  try {
    const response = await axios.get(
      `https://${config.API_HOST_RES}/api/v1/restaurant/searchRestaurants?locationId=${locationId}`,
      {
        headers: {
          'x-rapidapi-key': config.API_KEY_RES,
          'x-rapidapi-host': config.API_HOST_RES,
        },
      }
    );

    const restaurants = response.data?.data?.data || [];
    return restaurants.map((restaurant) => ({
      name: restaurant.name,
      averageRating: restaurant.averageRating,
      parentGeoName: restaurant.parentGeoName,
      tags: restaurant.establishmentTypeAndCuisineTags,
      thumbnail: restaurant.thumbnail?.photo?.photoSizeDynamic?.urlTemplate
        ? restaurant.thumbnail.photo.photoSizeDynamic.urlTemplate
            .replace('{width}', '200') 
            .replace('{height}', '200') 
        : 'https://via.placeholder.com/200', 
    }));
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    throw error;
  }
};