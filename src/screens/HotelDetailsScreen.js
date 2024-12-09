import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotels } = route.params;

  const saveBookingHistory = async (bookingData) => {
    try {
     
      const existingHistory = await AsyncStorage.getItem('bookingHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];

    
      const updatedHistory = [...history, bookingData];

      
      await AsyncStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));

      
      navigation.navigate('PaymentScreen', {
        selectedService: bookingData,
        serviceType: 'hotel',
      });
    } catch (error) {
      console.error('Error saving booking history:', error);
    }
  };

  const renderHotelCard = (item) => {
    const hotelName = item.name ? item.name : 'No Name Available';
    const hotelLocation = item.location ? item.location : 'No Location Available';
    const hotelCheckin = item.checkin ? item.checkin : 'No Check-in Time Available';
    const hotelCheckout = item.checkout ? item.checkout : 'No Checkout Time Available';
    const hotelPrice = item.price ? parseFloat(item.price).toFixed(2) : 'No Price Available';
    const hotelRating = item.rating ? item.rating : 'No Rating Available';

    const hotelData = {
      name: hotelName,
      location: hotelLocation,
      checkin: hotelCheckin,
      checkout: hotelCheckout,
      price: hotelPrice,
      rating: hotelRating,
    };

    return (
      <TouchableOpacity
        style={styles.card}
        key={item.name}
        onPress={() => saveBookingHistory(hotelData)} 
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.hotelImage} />
        ) : (
          <View style={styles.hotelImage} />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.hotelName}>{hotelName}</Text>
          <Text style={styles.hotelCheckin}>checkin: {hotelCheckin}</Text>
          <Text style={styles.hotelCheckout}>Checkout: {hotelCheckout}</Text>
          <Text style={styles.locationText}>Location: {hotelLocation}</Text>
          <Text style={styles.ratingText}>Rating: {hotelRating} ⭐</Text>
          <Text style={styles.priceText}>Price: ${hotelPrice}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../../assets/hotel-BG.jpg')} style={styles.background} imageStyle={styles.backgroundImage}>
      <LinearGradient colors={['rgba(0,0,0,0.98)', 'transparent']} style={styles.gradientOverlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Hotel Details</Text>
        </View>

        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => renderHotelCard(hotel))
        ) : (
          <Text style={styles.noHotelsText}>No hotels available</Text>
        )}
      </ScrollView>

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
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(44, 44, 44, 0.98)',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    overflow: 'hidden',
    marginHorizontal: 18,
  },
  hotelImage: {
    width: 120,
    height: 180,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  hotelCheckin: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  hotelCheckout: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginTop: 5,
  },
});
export default HotelDetailsScreen;
