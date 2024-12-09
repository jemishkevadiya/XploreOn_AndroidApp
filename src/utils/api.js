
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

export const handlePickUpLocationChange = async (pickupLocation) => {
  try {
      const response = await axios.get(`https://${config.API_HOST}/api/v1/cars/searchDestination`, {
          headers: {
              'X-Rapidapi-Key': config.API_KEY,
              'X-Rapidapi-Host': config.API_HOST,
          },
          params: { query: pickupLocation },
      });

      console.log('PickUp Location Response:', response.data);

      if (response.data.status && response.data.data.length > 0) {
          const coordinates = response.data.data[0].coordinates;
          return {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
          };
      } else {
          alert(`Location not found for: ${pickupLocation}`);
          return null;
      }
  } catch (error) {
      console.error('Error fetching PickUp coordinates:', error);
      alert('Failed to fetch PickUp coordinates. Please try again.');
      return null;
  }
};

export const handleDropOffLocationChange = async (dropOffLocation) => {
  try {
      const response = await axios.get(`https://${config.API_HOST}/api/v1/cars/searchDestination`, {
          headers: {
              'X-Rapidapi-Key': config.API_KEY,
              'X-Rapidapi-Host': config.API_HOST,
          },
          params: { query: dropOffLocation },
      });

      console.log('DropOff Location Response:', response.data);

      if (response.data.status && response.data.data.length > 0) {
          const coordinates = response.data.data[0].coordinates;
          return {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
          };
      } else {
          alert(`Location not found for: ${dropOffLocation}`);
          return null;
      }
  } catch (error) {
      console.error('Error fetching DropOff coordinates:', error);
      alert('Failed to fetch DropOff coordinates. Please try again.');
      return null;
  }
};

export const searchCarRentals = async (pickUpCoordinates, dropOffCoordinates, pickUpDate, dropOffDate, pickUpTime, dropOffTime, currencyCode) => {
  try {
      console.log('Request Params:', {
          pick_up_latitude: pickUpCoordinates.latitude,
          pick_up_longitude: pickUpCoordinates.longitude,
          drop_off_latitude: dropOffCoordinates.latitude,
          drop_off_longitude: dropOffCoordinates.longitude,
          pick_up_date: pickUpDate,
          drop_off_date: dropOffDate,
          pick_up_time: pickUpTime,
          drop_off_time: dropOffTime,
          currency_code: currencyCode,
      });

      const response = await axios.get(`https://${config.API_HOST}/api/v1/cars/searchCarRentals`, {
          headers: {
              'X-Rapidapi-Key': config.API_KEY,
              'X-Rapidapi-Host': config.API_HOST,
          },
          params: {
              pick_up_latitude: pickUpCoordinates.latitude,
              pick_up_longitude: pickUpCoordinates.longitude,
              drop_off_latitude: dropOffCoordinates.latitude,
              drop_off_longitude: dropOffCoordinates.longitude,
              pick_up_date: pickUpDate,
              drop_off_date: dropOffDate,
              pick_up_time: pickUpTime,
              drop_off_time: dropOffTime,
              currency_code: currencyCode,
          },
      });

      console.log('Car Rentals API Response:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching car rentals:', error);
      alert('Failed to fetch car rentals. Please try again.');
      throw new Error('Failed to fetch car rentals.');
  }
};
