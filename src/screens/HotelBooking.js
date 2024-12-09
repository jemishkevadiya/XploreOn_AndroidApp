import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView,
  ScrollView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchDestinationCode, fetchHotelData } from '../utils/api'; 
import Footer from '../components/Footer';


const HotelBooking = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [person, setPerson] = useState('');
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState('');

  // Fetch the destination code based on location input
  const getDestinationCode = async (location) => {
    try {
      setLoading(true);
      const data = await fetchDestinationCode(location); 
    
      if (data && data.data && data.data[0] && data.data[0].search_type === 'city') {
        const destinationCode = data.data[0].dest_id;
        getHotelData(destinationCode); 
      } else {
        setError('City destination not found');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching destination:', error);
      setError('Error fetching destination');
      setLoading(false);
    }
  };

  // Fetch hotels data based on destination code and other search parameters
  const getHotelData = async (destinationCode) => {
    try {
      const data = await fetchHotelData(destinationCode, checkIn, checkOut, person); 
      if (data && data.data && data.data.hotels && data.data.hotels.length > 0) {
        const hotelList = data.data.hotels.map((hotel) => {
          const hotelProperty = hotel.property || {};
          const priceBreakdown = hotelProperty.priceBreakdown || {};
          const photoUrls = hotelProperty.photoUrls || [];
          const reviewScore = hotelProperty.reviewScore || 'No rating';
          const name = hotelProperty.name || 'Unknown Hotel';
          const checkin = hotelProperty.checkinDate || 'No checkin date';
          const checkout = hotelProperty.checkoutDate || 'No checkout date';
          const price = priceBreakdown.grossPrice ? priceBreakdown.grossPrice.value : 'No price';
          const location = hotelProperty.wishlistName || 'Unknown Location';
    
          return {
            name,
            location,
            imageUrl: photoUrls[0],
            checkin,
            checkout,
            price,
            rating: reviewScore,
          };
        });

        setHotelData(hotelList);
        navigation.navigate('HotelDetailsScreen', { hotels: hotelList }); 
      } else {
        setError('No hotels found');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      setError('Error fetching hotel data');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (location && checkIn && checkOut && person) {
      if (new Date(checkIn) >= new Date(checkOut)) {
        setError('Check-out date must be after Check-in date');
        return;
      }
      if (isNaN(person) || parseInt(person) <= 0) {
        setError('Please enter a valid number for persons');
        return;
      }
      setLoading(true); 
      getDestinationCode(location);
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/hotel-BG.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']} 
        style={styles.gradientOverlay}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'android' ? 70 : 0} 
      >
        <ScrollView contentContainerStyle={styles.scrollContent}
         showsVerticalScrollIndicator={false}
         keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* Main Section */}
            <Text style={styles.headerText}>{"Let's"}</Text>
            <Text style={styles.headerText}>{"Explore Hotels"}</Text>

            {/* Input Fields */}
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={20} color="#fff" />
                <TextInput 
                  style={styles.input}
                  placeholder="Location" 
                  placeholderTextColor="#ccc"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Check-in" 
                  placeholderTextColor="#ccc" 
                  value={checkIn}
                  onChangeText={setCheckIn}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Check-out" 
                  placeholderTextColor="#ccc" 
                  value={checkOut}
                  onChangeText={setCheckOut}
                />
              </View>
              <View style={styles.inputRow}>
                <Ionicons name="people-outline" size={20} color="#fff" />
                <TextInput 
                  style={styles.input} 
                  placeholder="Person" 
                  placeholderTextColor="#ccc" 
                  value={person}
                  onChangeText={setPerson}
                />
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity 
              style={styles.searchButton} 
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {/* Error Message */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#ff6f00" />}
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
  inputGroup: {
    marginVertical: 20,
    marginTop: 60,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  searchButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: '#ff6f00',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  hotelList: {
    marginTop: 30,
  },
  hotelItem: {
    marginBottom: 20,
  },
  hotelImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hotelPrice: {
    fontSize: 16,
    color: '#ff6f00',
  },
});

export default HotelBooking;
