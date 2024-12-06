import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotels } = route.params; 

  console.log('Hotel data:', hotels);

  const renderHotelCard = (item) => {

    const hotelName = item.name ? item.name : 'No Name Available';
    const hotelLocation = item.location ? item.location : 'No Location Available';
    const hotelCheckin = item.checkin ? item.checkin : 'No Check-in Time Available';
    const hotelCheckout = item.checkout ? item.checkout : 'No Checkout Time Available';
    const hotelPrice = item.price ?  parseFloat(item.price).toFixed(2) :'No Price Available';
    const hotelRating = item.rating ? item.rating : 'No Rating Available';


    console.log('Hotel Item:', item);

    return (
      <TouchableOpacity
        style={styles.card}
        key={item.name} 
        onPress={() =>
          navigation.navigate('PaymentScreen', {
            selectedService: {
              name: hotelName,
              location: hotelLocation,
              checkin: hotelCheckin,
              checkout: hotelCheckout,
              price: hotelPrice,
              rating: hotelRating,
            },
            serviceType: 'hotel',
          })
        }
      >
        
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.hotelImage} />
        ) : (
          <View style={styles.hotelImage} /> 
        )}

        <View style={styles.cardContent}>
          
          <Text style={styles.hotelName}>{hotelName}</Text>
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
        {/* Header */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Hotel Details</Text>
        </View>

        {/* Hotel Cards */}
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => renderHotelCard(hotel)) 
        ) : (
          <Text style={styles.noHotelsText}>No hotels available</Text> 
        )}
      </ScrollView>

      {/* Footer */}
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
    height: 140,
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
  },
  ratingText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginTop: 5,
  },
  noHotelsText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HotelDetailsScreen;
