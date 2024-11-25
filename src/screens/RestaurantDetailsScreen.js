import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

const RestaurantDetailsScreen = ({ navigation }) => {
  const restaurantData = [
    {
      id: '1',
      name: 'The Gourmet Bistro',
      location: 'New York, USA',
      rating: '4.7',
      priceRange: '$50-$80',
      specialty: 'French Cuisine',
      image: require('../../assets/TheGourmetBistro.jpg'),
    },
    {
      id: '2',
      name: 'Ocean Breeze Diner',
      location: 'Miami, USA',
      rating: '4.5',
      priceRange: '$70-$80',
      specialty: 'Seafood',
      image: require('../../assets/OceanBreezeDiner.jpg'),
    },
    {
      id: '3',
      name: 'Mountain View Grill',
      location: 'Denver, USA',
      rating: '4.6',
      priceRange: '$60-$100',
      specialty: 'Steakhouse',
      image: require('../../assets/MountainViewGrill.jpg'),
    },
    {
      id: '4',
      name: 'Urban Vegan Cafe',
      location: 'San Francisco, USA',
      rating: '4.8',
      priceRange: '$70-$90',
      specialty: 'Vegan & Organic',
      image: require('../../assets/UrbanVeganCafe.jpg'),
    },
    {
      id: '5',
      name: 'Sushi Paradise',
      location: 'Seattle, USA',
      rating: '4.9',
      priceRange: '$40-$70',
      specialty: 'Japanese Sushi',
      image: require('../../assets/SushiParadise.jpg'),
    },
    {
      id: '6',
      name: 'La Bella Italia',
      location: 'Las Vegas, USA',
      rating: '4.8',
      priceRange: '$65-$75',
      specialty: 'Italian Cuisine',
      image: require('../../assets/LaBellaItalia.jpg'),
    },
  ];

  const renderRestaurantCard = (item) => (
    <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigation.navigate('PaymentScreen', 
        { selectedHotel: item, serviceType: 'restaurant'})}>
      <Image source={item.image} style={styles.restaurantImage} />
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.locationText}>Location: {item.location}</Text>
        <Text style={styles.ratingText}>Rating: {item.rating} ⭐</Text>
        <Text style={styles.specialtyText}>Specialty: {item.specialty}</Text>
        <Text style={styles.priceRangeText}>Price Range: {item.priceRange}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../../assets/restaurant-BG.jpg')} style={styles.background}
     imageStyle={styles.backgroundImage}>
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
          <Text style={styles.titleText}>Restaurant Details</Text>
        </View>

        {/* Restaurant Cards */}
        {restaurantData.map(renderRestaurantCard)}

       
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
    opacity: 0.75,
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
  restaurantImage: {
    width: 120,
    height: 140,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  restaurantName: {
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
  specialtyText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  priceRangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginTop: 5,
  },
});

export default RestaurantDetailsScreen;

