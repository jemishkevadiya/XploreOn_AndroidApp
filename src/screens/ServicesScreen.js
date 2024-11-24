import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const ServicesScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#333333', '#fad0c4']}
      style={styles.background}
    >
      {/* Back Arrow */}
      <View style={styles.backArrow}>
       {/* Custom Header */}
       <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </ TouchableOpacity> </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Our Services</Text>
        </View>

        {/* Main Services Section */}
        <View style={styles.servicesContainer}>
          {/* Flights */}
          <TouchableOpacity style={styles.card}>
            <ImageBackground
              source={require('../../assets/flight.jpg')} 
              style={styles.cardImage}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.cardText}>Flights</Text>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => navigation.navigate('FlightBooking')}
              >
                <Text style={styles.cardButtonText}>Book Now</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>

          {/* Hotels */}
          <TouchableOpacity style={styles.card}>
            <ImageBackground
              source={require('../../assets/hotel.jpg')}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.cardText}>Hotels</Text>
              <TouchableOpacity style={styles.cardButton}  onPress={() => navigation.navigate('HotelBooking')}>
                <Text style={styles.cardButtonText}>Book Now</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>

          {/* Car Rentals */}
          <TouchableOpacity style={styles.card}>
            <ImageBackground
              source={require('../../assets/Car_rental.jpg')}
              style={styles.cardImage}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.cardText}>Car Rentals</Text>
              <TouchableOpacity style={styles.cardButton}  onPress={() => navigation.navigate('CarRentalsScreen')}>
                <Text style={styles.cardButtonText}>Book Now</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>

          {/* Restaurants */}
          <TouchableOpacity style={styles.card}>
            <ImageBackground
              source={require('../../assets/restaurant.jpg')} 
              style={styles.cardImage}
              imageStyle={{ borderRadius: 15 }}
            >
              <Text style={styles.cardText}>Restaurants</Text>
              <TouchableOpacity style={styles.cardButton}  onPress={() => navigation.navigate('RestaurantScreen')}>
                <Text style={styles.cardButtonText}>Book Now</Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* Bottom Section for Itinerary */}
        <View style={styles.bottomSection}>
          <Text style={styles.mainHeading}>Personalized Itinerary Generator</Text>
          <Text style={styles.subHeading}>
            Say goodbye to stress and hello to seamless travel with our itinerary generator.
          </Text>
          <TouchableOpacity
            style={styles.itineraryButton}
            onPress={() => navigation.navigate('ItineraryScreen')}
          >
            <Text style={styles.itineraryButtonText}>Start Planning</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  servicesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  card: {
    width: '93%',
    height: 245,
    marginBottom: 20,
    borderRadius: 15,
    marginLeft: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: 245,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 100,
    marginLeft: 15,
  },
  cardButton: {
    backgroundColor: 'rgba(255, 111, 0, 0.9)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomSection: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  mainHeading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    alignSelf: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    alignSelf: 'center',
  },
  itineraryButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  itineraryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default ServicesScreen;
