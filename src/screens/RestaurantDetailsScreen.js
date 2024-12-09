import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import { searchRestaurants } from '../utils/api';

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { locationId, reservationDate, person } = route.params; 
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await searchRestaurants(locationId);
        setRestaurants(data); 
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again.');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchRestaurants();
  }, [locationId]);

  const renderRestaurantCard = (item) => (
    <TouchableOpacity
      style={styles.card}
      key={item.name}
      onPress={() =>
        navigation.navigate('PaymentScreen', {
          selectedService: {
            name: item.name || 'No Name Available',
            location: item.parentGeoName || 'No Location Available',
            date: reservationDate || 'No Reservation Date',
            type: item.tags.join(', ') || 'No Price Available',
          },
          serviceType: 'restaurant',
        })
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.restaurantImage} />
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.locationText}>Location: {item.parentGeoName}</Text>
        <Text style={styles.ratingText}>Rating: {item.averageRating} ⭐</Text>
        <Text style={styles.specialtyText}>
          Tags: {item.tags ? item.tags.join(', ') : 'No tags available'}
        </Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <ImageBackground
      source={require('../../assets/restaurant-BG.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
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

        {/* Loading or Error Message */}
        {loading ? (
          <ActivityIndicator size="large" color="#ff6f00" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : restaurants.length === 0 ? (
          <Text style={styles.noDataText}>No restaurants found for this location.</Text>
        ) : (
          restaurants.map(renderRestaurantCard)
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
