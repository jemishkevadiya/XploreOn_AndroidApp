import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const FlightScreen = ({ navigation }) => {
  const [tripType, setTripType] = useState('One Way');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [travelClass, setTravelClass] = useState('');

  const handleSearch = () => {
   
    if (!origin || !destination || !departureDate || !passengers || !travelClass) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    
    if (origin.toLowerCase() === destination.toLowerCase()) {
      Alert.alert('Error', 'Origin and destination cannot be the same.');
      return;
    }
  
    const passengerCount = parseInt(passengers, 10);
    if (isNaN(passengerCount) || passengerCount <= 0) {
      Alert.alert('Error', 'Please enter a valid number of passengers.');
      return;
    }
  
  
    const validClasses = ['Economy', 'Business', 'First'];
    if (!validClasses.includes(travelClass.trim())) {
      Alert.alert(
        'Error',
        `Please select a valid travel class: ${validClasses.join(', ')}.`
      );
      return;
    }
  
  
    const today = new Date();
    const departure = new Date(departureDate);
    if (isNaN(departure.getTime()) || departure < today) {
      Alert.alert('Error', 'Please select a valid departure date.');
      return;
    }
  
    if (tripType === 'Round Trip') {
      const returnDt = new Date(returnDate);
      if (
        isNaN(returnDt.getTime()) ||
        returnDt <= departure
      ) {
        Alert.alert('Error', 'Please select a valid return date after the departure date.');
        return;
      }
    }
  
    
    navigation.navigate('FlightDetailsScreen', {
      origin,
      destination,
      departureDate,
      returnDate: tripType === 'Round Trip' ? returnDate : null,
      passengers,
      travelClass,
    });
  };
  

  return (
    <ImageBackground source={require('../../assets/flight-bg.jpg')} style={styles.background}>
      <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradientOverlay} />
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === 'android' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.headerText}>{"Let's"}</Text>
            <Text style={styles.headerText}>{"Explore Flights"}</Text>

      
            <View style={styles.radioGroup}>
              <TouchableOpacity style={styles.radioOption} onPress={() => setTripType('One Way')}>
                <Ionicons name={tripType === 'One Way' ? 'radio-button-on' : 'radio-button-off'} size={20} color={tripType === 'One Way' ? '#ff6f00' : '#fff'} />
                <Text style={styles.radioText}>One Way</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption} onPress={() => setTripType('Round Trip')}>
                <Ionicons name={tripType === 'Round Trip' ? 'radio-button-on' : 'radio-button-off'} size={20} color={tripType === 'Round Trip' ? '#ff6f00' : '#fff'} />
                <Text style={styles.radioText}>Round Trip</Text>
              </TouchableOpacity>
            </View>

            
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Ionicons name="airplane-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="From" placeholderTextColor="#ccc" value={origin} onChangeText={setOrigin} />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="To" placeholderTextColor="#ccc" value={destination} onChangeText={setDestination} />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="Departure Date (YYYY-MM-DD)" placeholderTextColor="#ccc" value={departureDate} onChangeText={setDepartureDate} />
              </View>
              {tripType === 'Round Trip' && (
                <View style={styles.inputRow}>
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <TextInput style={styles.input} placeholder="Return Date (YYYY-MM-DD)" placeholderTextColor="#ccc" value={returnDate} onChangeText={setReturnDate} />
                </View>
              )}
              <View style={styles.inputRow}>
                <Ionicons name="briefcase-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="Class" placeholderTextColor="#ccc" value={travelClass} onChangeText={setTravelClass} />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="people-outline" size={20} color="#fff" />
                <TextInput style={styles.input} placeholder="Passengers" placeholderTextColor="#ccc" value={passengers} onChangeText={setPassengers} />
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
  backgroundImage: {
    opacity: 0.80,
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