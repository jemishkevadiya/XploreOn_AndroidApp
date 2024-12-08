import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,
  ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';
import { fetchFlightSearchResults } from '../utils/api';

const preprocessInput = (input) => {
  const processedInput = input.trim().toUpperCase();
  return processedInput.endsWith('.AIRPORT') ? processedInput : `${processedInput}.AIRPORT`;
};

const FlightScreen = ({ navigation }) => {
  const [tripType, setTripType] = useState('One Way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [travelClass, setTravelClass] = useState('');

  const isFutureDate = (selectedDate) => {
    const currentDate = new Date(); 
    const tripDate = new Date(selectedDate); 
    return tripDate >= currentDate; 
  };

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate || !passengers || !travelClass) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (origin.toLowerCase() === destination.toLowerCase()) {
      Alert.alert('Error', 'Origin and destination cannot be the same.');
      return;
    }

    if (!isFutureDate(departureDate)) {
      Alert.alert('Departure date must be today or in the future.');
      return;
    }
  
    if (tripType === 'Round Trip') {
      if (!isFutureDate(returnDate)) {
        Alert.alert('Error', 'Return date must be today or in the future.');
        return;
      }
  
      if (new Date(returnDate) <= new Date(departureDate)) {
        Alert.alert('Error', 'Return date must be after the departure date.');
        return;
      }
    }
    

    const passengerCount = parseInt(passengers, 10);
    if (isNaN(passengerCount) || passengerCount <= 0) {
      Alert.alert('Error', 'Please enter a valid number of passengers.');
      return;
    }

    const validClasses = ['ECONOMY', 'BUSINESS', 'FIRST'];
    const formattedClass = travelClass.trim().toUpperCase();
    if (!validClasses.includes(formattedClass)) {
      Alert.alert('Error', `Please select a valid travel class: ${validClasses.join(', ')}.`);
      return;
    }

    const formattedFromId = preprocessInput(origin);
    const formattedToId = preprocessInput(destination);

    const params = {
      fromId: formattedFromId,
      toId: formattedToId,
      departureDate,
      returnDate: tripType === 'Round Trip' ? returnDate : undefined,
      cabinClass: formattedClass,
      adults: passengers,
    };

    try {
      const searchResults = await fetchFlightSearchResults(params);

      const flights = searchResults.data.flightOffers || searchResults.data.flightDeals || [];
      console.log('Extracted Flights:', flights);

      if (flights.length === 0) {
        Alert.alert('No Flights', 'No flights found for your search criteria.');
        return;
      }

      navigation.navigate('FlightDetailsScreen', { searchResults });
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch flight data. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/flight-bg.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradientOverlay}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>{"Let's Explore Flights"}</Text>

            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setTripType('One Way')}
              >
                <Ionicons
                  name={tripType === 'One Way' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={tripType === 'One Way' ? '#ff6f00' : '#fff'}
                />
                <Text style={styles.radioText}>One Way</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setTripType('Round Trip')}
              >
                <Ionicons
                  name={tripType === 'Round Trip' ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={tripType === 'Round Trip' ? '#ff6f00' : '#fff'}
                />
                <Text style={styles.radioText}>Round Trip</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Ionicons name="airplane-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="From"
                  placeholderTextColor="#ccc"
                  value={origin}
                  onChangeText={setOrigin}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="To"
                  placeholderTextColor="#ccc"
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Departure Date (YYYY-MM-DD)"
                  placeholderTextColor="#ccc"
                  value={departureDate}
                  onChangeText={setDepartureDate}
                />
              </View>
              {tripType === 'Round Trip' && (
                <View style={styles.inputRow}>
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <TextInput
                    style={styles.input}
                    placeholder="Return Date (YYYY-MM-DD)"
                    placeholderTextColor="#ccc"
                    value={returnDate}
                    onChangeText={setReturnDate}
                  />
                </View>
              )}
              <View style={styles.inputRow}>
                <Ionicons name="briefcase-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Class (Economy/Business/First)"
                  placeholderTextColor="#ccc"
                  value={travelClass}
                  onChangeText={setTravelClass}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="people-outline" size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Passengers"
                  placeholderTextColor="#ccc"
                  value={passengers}
                  onChangeText={setPassengers}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
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
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardAvoidingView: {
    flex: 1,
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
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 15,
  },
  radioText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 16,
  },
  inputGroup: {
    marginVertical: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

export default FlightScreen;
