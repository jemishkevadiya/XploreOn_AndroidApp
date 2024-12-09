import axios from 'axios';
import config from './config';

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
