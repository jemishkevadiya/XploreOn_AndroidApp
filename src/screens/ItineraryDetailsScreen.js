import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const ItineraryDetailsScreen = ({ navigation }) => {
  const destination = 'San Francisco';

  const itineraryData = [
    {
      day: 'Day 1',
      places: [
        { name: 'Golden Gate Bridge', description: 'An iconic suspension bridge connecting San Francisco Bay to the Pacific Ocean.' },
        { name: 'Alcatraz Island', description: 'A historic island with an abandoned prison, offering tours and scenic views.' },
        { name: 'Pier 39', description: 'A lively waterfront area with shops, restaurants, and sea lions.' },
      ],
      restaurants: [
        { name: 'Urban Vegan Cafe', description: 'A modern cafe offering organic and vegan-friendly dishes.' },
        { name: 'Sushi Paradise', description: 'A highly rated sushi bar known for fresh and authentic Japanese cuisine.' },
      ],
    },
    {
      day: 'Day 2',
      places: [
        { name: 'Chinatown', description: 'A bustling area filled with authentic Chinese eateries and shops.' },
        { name: 'Lombard Street', description: 'Famous for its steep and crooked layout with beautifully landscaped turns.' },
        { name: "Fisherman's Wharf", description: 'A historic waterfront area with attractions, dining, and shops.' },
      ],
      restaurants: [
        { name: 'La Bella Italia', description: 'A cozy Italian restaurant known for its pasta and wood-fired pizzas.' },
        { name: 'The Gourmet Bistro', description: 'An elegant bistro serving French-inspired dishes and fine wines.' },
      ],
    },
  ];

  const renderPlaces = (places) =>
    places.map((place) => (
      <View key={place.name} style={styles.infoBox}>
        <Text style={styles.itemName}>{place.name}</Text>
        <Text style={styles.itemDescription}>{place.description}</Text>
      </View>
    ));

  const renderRestaurants = (restaurants) =>
    restaurants.map((restaurant) => (
      <View key={restaurant.name} style={styles.infoBox}>
        <Text style={styles.itemName}>{restaurant.name}</Text>
        <Text style={styles.itemDescription}>{restaurant.description}</Text>
      </View>
    ));

  const renderItinerary = () =>
    itineraryData.map((dayData) => (
      <View key={dayData.day}>
        <Text style={styles.dayTitle}>{dayData.day}</Text>
        <Text style={styles.subHeading}>Places to Visit:</Text>
        {renderPlaces(dayData.places)}
        <Text style={styles.subHeading}>Restaurants Nearby:</Text>
        {renderRestaurants(dayData.restaurants)}
      </View>
    ));

  return (
    <ImageBackground
      source={require('../../assets/itinerary-BG.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.gradientOverlay} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.backArrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Title */}
          <Text style={styles.titleText}>{destination} Itinerary</Text>

          {/* Flight Information */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Flight Details</Text>
            <Text style={styles.infoText}>Fly Emirates: NYC → SFO</Text>
          </View>

          {/* Hotel Information */}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Hotel Details</Text>
            <Text style={styles.infoText}>Skyline Resort, San Francisco</Text>
          </View>

          {/* Itinerary Details */}
          {renderItinerary()}
        </ScrollView>

        {/* Footer */}
        <Footer navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImage: {
    opacity: 0.7, 
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  backArrow: {
    marginTop: 70,
    marginLeft: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(44, 44, 44, 0.85)',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 15,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#ccc',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default ItineraryDetailsScreen;
