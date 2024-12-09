import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,
    ScrollView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';
import { handlePickUpLocationChange, handleDropOffLocationChange, searchCarRentals } from '../utils/api';

const CarRental = ({ navigation }) => {
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropOffLocation, setDropOffLocation] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');
    const [pickUpTime, setPickUpTime] = useState('');
    const [dropOffTime, setDropOffTime] = useState('');
    const [currencyCode, setCurrencyCode] = useState('CAD');
   
    const [pickUpCoordinates, setPickUpCoordinates] = useState({ latitude: null, longitude: null });
    const [dropOffCoordinates, setDropOffCoordinates] = useState({ latitude: null, longitude: null });
    const validateForm = () => {
        if (!pickUpLocation || !dropOffLocation) {
            alert("Please enter both pick-up and drop-off locations.");
            return false;
        }
    
        if (!pickUpDate || !dropOffDate || !pickUpTime || !dropOffTime) {
            alert("Please fill in all date and time fields.");
            return false;
        }
    
        const pickUpDateObj = new Date(pickUpDate);
        if (isNaN(pickUpDateObj.getTime())) {
            alert("Please enter a valid pick-up date.");
            return false;
        }
    
        const dropOffDateObj = new Date(dropOffDate);
        if (isNaN(dropOffDateObj.getTime())) {
            alert("Please enter a valid drop-off date.");
            return false;
        }
        if (dropOffDateObj <= pickUpDateObj) {
            alert("Drop-off date must be after pick-up date.");
            return false;
        }
    
    
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeRegex.test(pickUpTime)) {
            alert("Please enter a valid pick-up time in HH:MM format.");
            return false;
        }
    
        if (!timeRegex.test(dropOffTime)) {
            alert("Please enter a valid drop-off time in HH:MM format.");
            return false;
        }
    
      
    
        return true;
    };
    

    const handleSearchButtonPress = async () => {
        if (!validateForm()) return;
                   
        try {
            const tempPickUpCoordinates = await handlePickUpLocationChange(pickUpLocation);
            const tempDropOffCoordinates = await handleDropOffLocationChange(dropOffLocation);

            if (tempPickUpCoordinates.latitude && tempDropOffCoordinates.latitude) {
                setPickUpCoordinates(tempPickUpCoordinates);
                setDropOffCoordinates(tempDropOffCoordinates);

                const carRentalsData = await searchCarRentals(
                    tempPickUpCoordinates,
                    tempDropOffCoordinates,
                    pickUpDate,
                    dropOffDate,
                    pickUpTime,
                    dropOffTime,
                    currencyCode
                );

                if (carRentalsData.status) {
                    const availableVehicles = carRentalsData.data.search_results.map(vehicle => ({
                        vehicle_id: vehicle.vehicle_id,
                        vehicle_name: vehicle.vehicle_info.v_name,
                        image_url: vehicle.vehicle_info.image_url,
                        price: vehicle.pricing_info.price,
                        currency: vehicle.pricing_info.currency,
                        fuel_policy: vehicle.vehicle_info.fuel_policy,
                        mileage: vehicle.vehicle_info.mileage,
                        transmission: vehicle.vehicle_info.transmission,
                        seats: vehicle.vehicle_info.seats,
                        doors: vehicle.vehicle_info.doors,
                        location: vehicle.route_info.pickup.name,
                        supplier: vehicle.content.supplier.name,
                    }));
                    navigation.navigate('CarDetailsScreen', { carData: availableVehicles });
                } else {
                    alert('No cars available for the selected details.');
                }
            } else {
                alert("Failed to fetch valid coordinates for both locations.");
            }
        } catch (error) {
            alert('An error occurred during the search process.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/CarRental.jpg')}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.gradientOverlay}
            />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'android' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>
                        <Text style={styles.headerText}>{"Let's Explore Car Rentals"}</Text>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputRow}>
                                <Ionicons name="location-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="PickUp Location"
                                    placeholderTextColor="#ccc"
                                    value={pickUpLocation}
                                    onChangeText={setPickUpLocation}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="location-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="DropOff Location"
                                    placeholderTextColor="#ccc"
                                    value={dropOffLocation}
                                    onChangeText={setDropOffLocation}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="calendar-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="PickUp Date"
                                    placeholderTextColor="#ccc"
                                    value={pickUpDate}
                                    onChangeText={setPickUpDate}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="calendar-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="DropOff Date"
                                    placeholderTextColor="#ccc"
                                    value={dropOffDate}
                                    onChangeText={setDropOffDate}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="time-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="PickUp Time"
                                    placeholderTextColor="#ccc"
                                    value={pickUpTime}
                                    onChangeText={setPickUpTime}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Ionicons name="time-outline" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="DropOff Time"
                                    placeholderTextColor="#ccc"
                                    value={dropOffTime}
                                    onChangeText={setDropOffTime}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer navigation={navigation} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    backgroundImage: {
        opacity: 0.75,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    headerText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputGroup: {
        marginVertical: 20,
        marginTop: 60,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#ff6f00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CarRental;
